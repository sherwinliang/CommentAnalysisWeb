<template>
  <div id="mywordcloud" :style="{width: '100%', height: '80%'}" :data="worddata"></div>
</template>

<script>
  import * as echarts from 'echarts'
  import "echarts-wordcloud/dist/echarts-wordcloud"
  import "echarts-wordcloud/dist/echarts-wordcloud.min"
  import {getRequest} from '../utils/api'
    export default {
      name: "VueWordCloud",
      data () {
        return {
          msg: 'Welcome to Your Vue.js App',
          worddata: [
            {
              name: "",
              value: 0
            },
            
          ]
        }
      },
      mounted(){
        this.getDate();
      },

      methods: {
        getDate(){
          getRequest("/hotspot/getHotspot?size=100").then(resp=> {
          if (resp) {
            var result =resp.data.data;
            for (let i = 0; i < result.length; i++) {
              this.worddata.push({
                name:result[i].name,
                value:result[i].value
              })
            }
            console.log('data==>'+this.worddata);
          } 
          this.initChart();
          });
        },
        initChart() {
          this.chart = echarts.init(document.getElementById("mywordcloud"));
          console.log('lll');

          

          const option = {
            title: {
              text: "",
              x: "center"
            },
            backgroundColor: "#fff",
            // tooltip: {
            //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
            // },
            series: [
              {
                type: "wordCloud",
                //用来调整词之间的距离
                gridSize: 10,
                //用来调整字的大小范围
                // Text size range which the value in data will be mapped to.
                // Default to have minimum 12px and maximum 60px size.
                sizeRange: [14, 60],
                // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
                //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
                // rotationRange: [-45, 0, 45, 90],
                rotationRange: [ 0,90],
                //rotationRange: [0, 0],
                //随机生成字体颜色
                // maskImage: maskImage,
                textStyle: {
                  
                    color: function() {
                      return (
                        "rgb(" +
                        Math.round(Math.random() * 255) +
                        ", " +
                        Math.round(Math.random() * 255) +
                        ", " +
                        Math.round(Math.random() * 255) +
                        ")"
                      );
                    
                  }
                },

                
                //位置相关设置
                // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
                // Default to be put in the center and has 75% x 80% size.
                left: "center",
                top: "center",
                right: null,
                bottom: null,
                width: "200%",
                height: "200%",
                //数据
                data: this.worddata
              }
            ]
          };


          this.chart.setOption(option);
        },
      }
    }
</script>