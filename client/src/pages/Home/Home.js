import React from 'react';
import moment, { relativeTimeRounding } from 'moment';
import axios from 'axios';
import LogOut from './../../components/logout/logout';
import { DatePicker, Input, Empty, Checkbox, Card, Skeleton, Icon, Row, Col, Button, message } from 'antd';
import { getFromStorage } from '../../utils/storage';
import './home.css';
const { Meta } = Card;
function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  
  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  
  
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
		Daily: false,
		Percentage: '',
		TotalTask: '',
        UnFinished: '',
        DueDate: []
	};
	showModal = () => {
		this.setState({
			visible: true
		});
	};
	error = () => {
		message.error('PLEASE PICK A DATE THAT HAS PASSED!!');
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
        this.productivity();
        console.log(this.state.Time)
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
        let a = dateClicked._d + ''
        let b = a.split("01:00") 
       
        console.log(b[0])
      this.setState({
          Time: b[0],
         
      })
	};
	onOk = (value) => {
        
    };
	onCheck = (e) => {
		console.log(`checked = ${e.target.checked}`);
		if (e.target.checked === true) {
			this.setState({
				Daily: true
			});
			let User = getFromStorage('trackrr');
			User = User.UserToken;
			axios
				.post('http://localhost:3001/api/task/daily/' + User, {
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
	};
	onCheckWithTask = (T) => {
		this.productivity();
		let User = getFromStorage('trackrr');
		User = User.UserToken;
		console.log(User);
		axios.post('http://localhost:3001/api/task/completed/' + User, {
			Content: T.Content,
			WhenCompleted: T.When
		});

		console.log(T._id);
		axios
			.get('http://localhost:3001/api/task/delete/' + T._id)
			.then((res) => res)
			.then((json) => {
				console.log(json);
			})
			.catch((err) => console.log(err));
		this.setState({
			AllTasks: this.state.AllTasks.filter((el) => el !== T)
		});
	};
	LoadTasks = () => {
		this.CheckTime(setInterval(this.CheckTime, 1000));
		let User = getFromStorage('trackrr');
		User = User.UserToken;
		axios
			.get('http://localhost:3001/api/account/task/' + User)
			.then((res) => res)
			.then((json) => {
				const z = json.data.filter((el) => el.Done !== true);
                const y = json.data.filter((el) => el.Done !== false);
				console.log(z);
				this.setState({
					AllTasks: z,
					CompletedTask: y
				});
			})
			.catch((err) => console.log(err));
	};
	addTask = () => {
		let User = getFromStorage('trackrr');
		User = User.UserToken;
		
		axios
			.post('http://localhost:3001/api/account/task/' + User, {
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
	CheckTime = () => {
		let User = getFromStorage('trackrr');
		User = User.UserToken;
		const time = moment().format('h:mm:ss a');

		if (time === '1:00:00 pm') {
			console.log('HIt');
			axios.get('http://localhost:3001/api/task/daily/' + User).then((res) => res).then((json) => {
				for (let i = 0; i < json.data.length; i++) {
					const element = json.data[i];
					console.log(element);

					axios
						.post('http://localhost:3001/api/account/task/' + User, {
							Content: element.Content,
							When: Date.now(),
							Done: false
						})
						.then((res) => res)
						.then((json) => {
							console.log(json);
						});
				}
			});
		}
	};
	productivity = () => {
		let User = getFromStorage('trackrr');
		User = User.UserToken;
		axios
			.get('http://localhost:3001/api/task/completed/' + User)
			.then((res) => res)
			.then((json) => {
				axios
					.get('http://localhost:3001/api/task/unfinished/' + User)
					.then((res) => res)
					.then((json2) => {
						let a = json.data.length;
						let b = json2.data.length;
						let c = a + b;
						let d = a / c;
						let e = d.toPrecision(2);
						let f = e * 100;
						if (a === 0) {
							this.setState({
								Percentage: 0,
								TotalTask: 0,
								UnFinished: 0
							});
						} else {
							this.setState({
								Percentage: f,
								TotalTask: a,
								UnFinished: b
							});
						}
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

	render() {
		const { loading } = this.state;
		if (this.state.falseEntry === true) {
			return (
				<div>
					<h1>You have to login in</h1>
				</div>
			);
		}

		return (
			<div>
				<Row>
					<Col className="col1" sm={{ span: 23, offset: 0 }} md={0} lg={0} xl={12}>
						<Row>
							<Col className="input-group">
								<h3>Add A Task</h3>
								<Input
									onChange={this.handleInputChange}
									name="Task"
									placeholder="Task"
									className="shift"
								/>
								<DatePicker
                                    format="MM-DD-YYYY HH:mm:ss"
                                    name="Time"
									disabledDate={disabledDate}
                                    disabledTime={disabledDateTime}
                                    onChange={this.onChange}
									showTime={{ defaultValue: moment('1:00:00', 'H:mm:ss a') }}
								/>
								<Checkbox onChange={this.onCheck}>Daily</Checkbox>
								<Button onClick={this.addTask} type="primary">
									Submit
								</Button>

								<LogOut />
							</Col>
							<div className="product">
								<Col xs={{ span: 12, offset: 0 }} lg={{ span: 6, offset: 1 }}>
									<h2 className="shiftpro">Productivity</h2>
									<div className="circle">{this.state.Percentage}%</div>
								</Col>
								<Col xs={{ span: 12, offset: 0 }} lg={{ span: 6, offset: 1 }}>
									<h2 className="shiftpro">Completed </h2>
									<div className="circle">{this.state.TotalTask}</div>
								</Col>
								<Col xs={{ span: 12, offset: 0 }} lg={{ span: 6, offset: 1 }}>
									<h2 className="shiftpro">UnFinished</h2>
									<div className="circle">{this.state.UnFinished}</div>
								</Col>
							</div>
						</Row>
					</Col>
					<Col className="col2" sm={{ span: 23, offset: 0 }} md={24} lg={{ span: 23, offset: 12 }} xl={12}>
						<Row>
							<Col xs={{ span: 24 }} lg={{ span: 12, offset: 9 }}>
								{this.state.AllTasks.length ? (
									<div>
										{this.state.AllTasks.map((One, index) => {
                                            let TodaysFullDate = moment().format('ddd MMM DD YYYY');
                                            let TodaysDay = moment().format('DD');
                                           
                                            // console.log(TodaysFullDate)
                                            // console.log(TodaysDay)
                                            
											return (
												<Row  type="flex" justify="space-around">
													<Col  span={18}>
														<Card
															loading={loading}
															style={{ marginTop: 16 }}
															actions={[
																<Button onClick={() => this.onCheckWithTask(One)}>
																	Completed
																</Button>
															]}
														>
                                                        <h4>{One.Content}</h4>
                                                        <p>{One.When}</p>
														
														</Card>
													</Col>
												</Row>
											);
										})}
									</div>
								) : (
                                    <Empty style={{marginTop: '2rem'}} image={Empty.PRESENTED_IMAGE_SIMPLE} />
								)}
							</Col>
						</Row>
					</Col>
				</Row>,
				<Row />
			</div>
		);
	}
}

export default Home;
