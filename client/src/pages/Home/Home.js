import React from 'react';
import moment, { relativeTimeRounding } from 'moment';
import axios from 'axios';
import LogOut from './../../components/logout/logout';
import { DatePicker, Input, Checkbox, Card, Skeleton, Icon, Row, Col, Button, Modal } from 'antd';
import { getFromStorage, setInStorage } from '../../utils/storage';
import { isRegExp } from 'util';
import './home.css'
import { func } from 'prop-types';
const { Meta } = Card;

class Home extends React.Component {
	state = {
		loading: true,
		Task: '',
		AllTasks: [],
		Time: '',
		dataTask: [],
        visible: false,
        falseEntry: '',
        CompletedTask: [],
        Daily: false
	};
	showModal = () => {
		this.setState({
			visible: true
		});
	};
	handleOk = (e) => {
		console.log(e);
		this.setState({
			visible: false
		});
	};
	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false
		});
	};
	onChange = (checked) => {
		this.setState({ loading: !checked });
	};
	componentDidMount() {
        this.CheckTime();
		this.LoadTasks();
		document.onreadystatechange = () => {
			if (document.readyState === 'complete') {
				this.setState({ loading: false });
			}
        };
        const obj = getFromStorage('the_main_app');
		if (obj && obj.token) {
			const { token } = obj;
			//verify token
			fetch('http://localhost:3001/api/account/verify?token=' + token).then((res) => res.json()).then((json) => {
				if (json.success) {
					this.setState({
						token
					});
				}
			});
		} else {
      //false entry renders a diffrent page if they were loged in 
			this.setState({
				falseEntry: true
      });
      //redirects them to the login page in 3sec
			setTimeout(() => {
				window.location.assign('/');
			}, 3000);
		}
	}
	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};
	onload() {
		this.setState({ loading: false });
	}
	onChange = (dateClicked, dateString) => {
		const TodaysDate = moment()._d;
		console.log(dateClicked._d);
		if (TodaysDate > dateClicked._d) {
			this.setState({
				visible: true
			});
		}
	};
	onOk = (value) => {
		this.setState({
			Time: value._d
		});
    };
    onCheck = (e) => {
        console.log(`checked = ${e.target.checked}`);
        if(e.target.checked === true){
            this.setState({
                Daily: true
            })
            let User = getFromStorage('trackrr');
		    User = User.UserToken;
            axios.post('http://localhost:3001/api/task/daily/' + User, {
				Content: this.state.Task,
                Done: false
			})
			.then((res) => res)
			.then((json) => {
				this.LoadTasks();
				console.log(json);
			})
			.catch((err) => console.log(err));
        }
    }
    onCheckWithTask = (T) => {
        console.log(T._id)
        axios
			.get('http://localhost:3001/api/task/delete/' + T._id)
			.then((res) => res)
			.then((json) => {
                console.log(json)
            })
		
			.catch((err) => console.log(err));
        this.setState({
            AllTasks: this.state.AllTasks.filter(el => el !== T),
        })
       
    }
	LoadTasks = () => {
		let User = getFromStorage('trackrr');
		User = User.UserToken;
		axios
			.get('http://localhost:3001/api/account/task/' + User)
			.then((res) => res)
			.then((json) => {
            const z = json.data.filter(el => el.Done !== true)
            const y = json.data.filter(el => el.Done !== false)
            console.log(z)
              this.setState({
                AllTasks: z,
                CompletedTask: y
            })
			})
			.catch((err) => console.log(err));
	};
	addTask = () => {
		let User = getFromStorage('trackrr');
		User = User.UserToken;
        console.log(User);

		axios.post('http://localhost:3001/api/account/task/' + User, {
				Content: this.state.Task,
                When: this.state.Time,
                Done: false
			})
			.then((res) => res)
			.then((json) => {
				this.LoadTasks();
				console.log(json);
			})
			.catch((err) => console.log(err));
    };   
    CheckTime =() => {
        callEveryHour()
        function callEveryHour() {
            setInterval(callthis, 1000*10);
        }
        function callthis(){
            const time   =    moment().format('h:mm a');
            console.log(time)
                let User = getFromStorage('trackrr');
                User = User.UserToken;
        axios
			.get('http://localhost:3001/api/task/daily/' + User)
			.then((res) => res)
			.then((json) => {
            console.log(json.data[0].Content)
                
                const num = 0
                const element = json.data[num];
                
           
                // axios.post('http://localhost:3001/api/account/task/' + User, {
                //     Content: element.Content,
                //     Done: false
                // })
                // .then((res) => res)
                // .then((json) => {
                //     console.log(json);
                //     num++
                //     setInterval(1000);
                // })
                }

           
            
            
            
            //.then
            )
        }
   
    }
	render() {
		const { loading } = this.state;
        if(this.state.falseEntry === true){
            return(
                <div>
                    <h1>no you have to login in</h1>
                </div>
            )
        }
		return (
			<div>
                	<Row>
                    <Col  xs={{ span: 24}} lg={{ span: 8, offset: 1 }} className='input-group' >
						<Input onChange={this.handleInputChange} name="Task" placeholder="Task" />
						<DatePicker
							mode="date"
							showTime
							placeholder="Select Time"
							name="Time"
							onChange={this.onChange}
							onOk={this.onOk}
						/>
                        <Checkbox  onChange={this.onCheck}>Daily</Checkbox>
						<Button onClick={this.addTask} type="primary">
							Submit
						</Button>
                       
                        <LogOut></LogOut>
					</Col>
					<Col  xs={{ span: 24}} lg={{ span: 5, offset: 9 }}>
				
				{this.state.AllTasks.length ? (
					<div>
						{this.state.AllTasks.map((One) => {
                         
							return (
                                
								<div>
									<Card
                                        className='card'
										style={{  marginTop: 16 }}
										actions={[
											<Checkbox onClick={()=> this.onCheckWithTask(One)}>Completed</Checkbox>
										]}
									>
										<Skeleton loading={loading} avatar active>
											<h2>{One.Content}</h2>
                                            <h4>Due</h4>
                                            <p>{One.When}</p>
										</Skeleton>
									</Card>
								</div>
							);
						})}
					</div>
				) : (
                   
					<h3>No tasks for today.</h3>
                )}
                </Col>
				
			

				<Modal title="WARNING!" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
					<h1>YOU CANNOT PICK A DATE THAT HAS PASSED!!</h1>
				</Modal>

			
                </Row>
             
			</div>
		);
	}
}

export default Home;
