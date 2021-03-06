import PropTypes from 'prop-types'
import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import HeaderComponent from './Common/header/header'
import FooterComponent from './Common/footer/footer'
import {withRouter} from 'react-router-dom'
import {Button, Form, Grid, Header, Icon, Image, Message, Segment} from 'semantic-ui-react'
import {Redirect} from "react-router";
import DataTable from '../Components/Common/table/table'
import {notification} from "antd";
import ApiCalls from '../class/apiCalls'


let apicall = new ApiCalls;

const optionsType = [
    {key: 'Client', value: 'Client', text: 'Client'},
    {key: 'Administrator', value: 'Administrator', text: 'Administrator'}
]
class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.userProfile? this.props.userProfile.FirstName : "",
            lastName: this.props.userProfile? this.props.userProfile.LastName : "",
            phone:this.props.userProfile? this.props.userProfile.phone : "",
            address:this.props.userProfile? this.props.userProfile.Address : "",
            email:this.props.userProfile? this.props.userProfile.email : "",
            password: '',
            type: this.props.userProfile? (this.props.userProfile.type=== 1 ? "Administrator" : "Client") : "",
            errorFirstName:false,
            errorLastName:false,
            errorPhone:false,
            errorAddress:false,
            errorEmail:false,
            errorPassword:false,
            errorType: false,
        }
    }
    changeFirstName=(e)=>{
        this.setState({firstName:e.target.value})
        this.setState({errorFirstName: false})

    }
    changeLastName=(e)=>{
        this.setState({lastName:e.target.value})
        this.setState({errorLastName: false})
    }
    changePhone=(e)=>{
        this.setState({phone:e.target.value})
        this.setState({errorPhone: false})
    }
    changeAddress=(e)=>{
        this.setState({address:e.target.value})
        this.setState({errorAddress: false})
    }
    changeEmail=(e)=>{
        this.setState({email:e.target.value})
        this.setState({errorEmail: false})
    }
    changePassword=(e)=>{
        this.setState({password:e.target.value})
        this.setState({errorPassword: false})
    }
    changeType=(e,{value})=>{
        this.setState({type:value});
    }
    editUser=()=>{
        let {firstName,lastName,phone,address, email, password, type } = this.state;
        if(!firstName || !lastName || !phone || !address || !email || !password || !type){
            if(!firstName){
                this.setState({errorFirstName: true})
            }
            if(!lastName){
                this.setState({errorLastName: true})
            }
            if(!phone){
                this.setState({errorPhone: true})
            }
            if(!address){
                this.setState({errorAddress: true})
            }
            if(!email){
                this.setState({errorEmail: true})
            }
            if(!password){
                this.setState({errorPassword: true})
            }
            if(!type){
                this.setState({errorType: true})
            }
            this.signupError();
        }else{
            this.setState({loading:true})
            let data={
                userId: this.props.userProfile.UserId,
                data:{UserId:this.props.userProfile.UserId,
                FirstName: firstName,
                LastName: lastName,
                phone: phone,
                Address: address,
                email: email,
                password: password,
                type: ''}
            }
            if(type === 'Client'){
                data.type=0;
            }else{
                data.type=1;
            }
            let temp = this.props;
            let temp2 = this;
            console.log(data)
            apicall.modifyUser(data,function(data){
                temp2.editConfirmation();
                temp.history.push(`/users`);
                temp2.setState({loading:false})
            });

        }
    }
    signupError = () => {
        notification.error({
            message: 'Error',
            description: 'You information is Missing!',
            duration:6,
        });
    };
    editConfirmation = () => {
        notification.success({
            message: 'Sucess',
            description: 'Editted Account has been added to Work Table',
            duration:6,
        });
    }
    render() {
        if(!this.props.userProfile) {
            return (<Redirect to={'/'}/>);
        }else {
            return (
                <div className='main-container'>
                    <HeaderComponent/>
                    <div className='MainContainer'>
                        <div className="MainContainer-upper-container">
                            <div className="MainContainer-upper-container-text">
                                <div className="MainContainer-upper-container-first-text">
                                    Settings
                                </div>
                                <div className="MainContainer-upper-container-second-text">
                                    You can see your profile information!
                                </div>
                            </div>
                        </div>
                        <Form size='large' className='SettingsForm'>
                            <Header as='h2' className='login-Header' style={{marginTop:'3%'}}textAlign='center'> Your Profile Information
                            </Header>
                            <Form.Group width='equal'>
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='John'
                                    label='First Name:'
                                    value={this.state.firstName}
                                    error={this.state.errorFirstName}
                                    onChange={this.changeFirstName}
                                    disabled={this.props.userProfile.type=== 0}
                                    width={8}/>
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Dylon'
                                    label='Last Name:'
                                    value={this.state.lastName}
                                    error={this.state.errorLastName}
                                    onChange={this.changeLastName}
                                    disabled={this.props.userProfile.type=== 0}
                                    width={8}/>
                            </Form.Group>
                            <Form.Input
                                fluid icon='phone'
                                iconPosition='left'
                                placeholder='Ex:514 888 111 32'
                                type='number'
                                value={this.state.phone}
                                error={this.state.errorPhone}
                                onChange={this.changePhone}
                                disabled={this.props.userProfile.type=== 0}
                                label='Phone:'/>
                            <Form.Input
                                fluid icon='address book'
                                iconPosition='left'
                                placeholder='Ex: 1445 Rue Guy Montreal QC, Canada'
                                value={this.state.address}
                                error={this.state.errorAddress}
                                onChange={this.changeAddress}
                                disabled={this.props.userProfile.type=== 0}
                                label='Address:'/>
                            <Form.Dropdown
                                className='dropdownchange'
                                fluid
                                disabled
                                label='Type of User'
                                placeholder='Select one of the options...'
                                value={this.state.type}
                                error={this.state.errorType}
                                onChange={this.changeType}
                                options={optionsType}

                            />
                            <Form.Input
                                disabled={this.props.userProfile.type=== 0}
                                fluid icon='mail'
                                iconPosition='left'
                                placeholder='john@concordia.ca'
                                value={this.state.email}
                                error={this.state.errorEmail}
                                onChange={this.changeEmail}
                                label='Email:'/>
                            {this.props.userProfile.type=== 1?
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                placeholder='Password'
                                value={this.state.password}
                                error={this.state.errorPassword}
                                onChange={this.changePassword}
                                type='password'
                            />: ''}
                            {this.props.userProfile.type=== 1?
                            <Button className='login-button' fluid size='large' onClick={this.editUser}>
                                Save
                            </Button> : ''}
                        </Form>
                    </div>

                    <FooterComponent/>
                </div>
            )
        }
    }
}
function mapStateToProps(state){
    return {
        userProfile: state.AdminReducer.userProfile
    };

}
export default withRouter(connect(mapStateToProps)(Settings));
