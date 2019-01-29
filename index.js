(function () {

  function loadJSON(url, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }
  
  function initChart() {
    return new Promise((resolve, reject) => {
      loadJSON("./data.json", (jsonData) => {
        try {
          var data = JSON.parse(jsonData);
          var myChart = echarts.init(document.getElementById('main'));

          var option = {
            title: {
              text: 'WORLD COFFEE RESEARCH SENSORY LEXICON',
              subtext: 'Source: https://worldcoffeeresearch.org/work/sensory-lexicon/',
              textStyle: {
                fontSize: 14,
                align: 'center'
              },
              subtextStyle: {
                align: 'center'
              },
              sublink: 'https://worldcoffeeresearch.org/work/sensory-lexicon/'
            },
            series: {
              type: 'sunburst',
              highlightPolicy: 'ancestor',
              data: data,
              radius: [0, '95%'],
              sort: null,
              levels: [{}, {
                r0: '15%',
                r: '35%',
                itemStyle: {
                  borderWidth: 2
                },
                label: {
                  rotate: 'tangential'
                }
              }, {
                r0: '35%',
                r: '70%',
                label: {
                  align: 'right'
                }
              }, {
                r0: '70%',
                r: '72%',
                label: {
                  position: 'outside',
                  padding: 3,
                  silent: false
                },
                itemStyle: {
                  borderWidth: 3
                }
              }]
            }
          };
          
          
          // use configuration item and data specified to show chart
          myChart.setOption(option);
          resolve(myChart);
        } catch(e) {
          reject(e);
        }
      })
    });
  }
  
  initChart().then((chart) => {
    
  }, (err) => {console.log(err);})

})()

