import React, {Component, Fragment} from 'react';
import {HorizontalBar} from 'react-chartjs-2';


class SentimentSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            gradients: []
         }
    }

    componentDidMount(){

        // Create gradient fills for the bars in the chart.
        const ctx = this.refs.chart.chartInstance.ctx;

        const positiveGradient = ctx.createLinearGradient(0,0,900,0);
        const negativeGradient = ctx.createLinearGradient(0,0,900,0);
        const neutralGradient = ctx.createLinearGradient(0,0,900,0);

        positiveGradient.addColorStop(0,"rgba(135,246,254,1)");
        positiveGradient.addColorStop(1,"rgba(229,248,249,.5)");

        negativeGradient.addColorStop(0,"rgba(236,107,82,1)");
        negativeGradient.addColorStop(1,"rgba(234,222,220,.5)");

        neutralGradient.addColorStop(0,"rgba(253,153,245,1)");
        neutralGradient.addColorStop(1,"rgba(252,237,251,.5)");

        this.setState({
            gradients: [positiveGradient, neutralGradient, negativeGradient]
        })

    }

    render() { 

        const chartData = {
            labels: ['Positive', 'Neutral', 'Negative'],
            datasets:[
              {
                label: 'Public Sentiment',
                data:[
                  this.props.publicTweetStats.positive,
                  this.props.publicTweetStats.neutral,
                  this.props.publicTweetStats.negative
                ],
                backgroundColor:this.state.gradients,
              }
            ],

          };

        const chartOptions = {
            legend: {
                display: false,
            },
            tooltips: {
                enabled: false
            },
            hover: {mode: null},
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    barPercentage: 0.2,
                    ticks: {
                        beginAtZero:true,
                        fontColor: "white",
                        fontFamily: "Tajawal",
                        fontSize: 15
                    },
                    gridLines: {
                        display: false,
                        color: "transparent"
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor: "white",
                        fontFamily: "Tajawal",
                        fontSize: 15
                    },
                    gridLines: {
                        display: false
                    }
                }]
            }
        }


        return (
            <Fragment>
                <h4 className='sentiment-summary__title'>Public Sentiments towards the user</h4>
    
                <div className='sentiment-summary'>
                    <div className='sentiment-summary__header'>Recent public sentiments surrounding @{this.props.foundUsername} have been
                        <span className={this.props.publicTweetStats.public_sentiment_majority}> {this.props.publicTweetStats.public_sentiment_majority} </span> 
                    </div>
    
                    <div className='sentiment-summary__chart'>
                        <HorizontalBar ref='chart'  data={chartData} options={chartOptions} />
                    </div>
                </div>

                <div className='sentiment-summary__tweets'>
                    <h4 className=''>Recent Public Tweets towards the user</h4>
                    <ul className=''>

                        {this.props.publicTweets.map((tweet)=>{
                            return (
                                <li className='' key={tweet.id}>
                                    <div className='tweeter-img'>
                                        <img className='' src={tweet.img} alt='users_image'/>
                                    </div>
                                    <div className='tweeter-tweet'>
                                        <div className='tweeter-tweet__header'>
                                            <strong>{tweet.name}</strong>
                                            <span className={'mood ' + tweet.sentiment}>{tweet.sentiment}</span>
                                        </div>
                                        <div className='tweeter-tweet__text'>
                                            {tweet.text}
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </Fragment>
          )
    }
}
 
export default SentimentSummary;
