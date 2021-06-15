import React, {Component} from 'react';
import { StyleSheet, View, Image, Button, FlatList } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Moment from 'moment';

export default class CowinCard extends Component {

  format = (list) => {
		const noUndefinedList = list.filter(item => item);
    return noUndefinedList.join(', ');
  }

	formatDoB = (dob) => {
		if (dob === undefined || dob === "") return "";
		return Moment(dob).format('MMM DD, YYYY')
	}

	render() {
		return (
			<Card containerStyle={styles.card}>
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>{Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} - Vaccine Record</Text>
					<FontAwesome5 style={styles.button} name={'trash'} onPress={() => this.props.removeItem(this.props.detail.signature)} solid/>
				</View>

        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.time}>{this.props.detail.cert.credentialSubject.name}, {this.props.detail.cert.evidence[0].dose}/{this.props.detail.cert.evidence[0].totalDoses}</Text>
				</View>

				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>{this.props.detail.cert.credentialSubject.age} year-old {this.props.detail.cert.credentialSubject.gender}</Text>
				</View>

				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.notes}>{this.props.detail.cert.credentialSubject.id.substring(4)}</Text>
				</View>
				
				<Divider style={{ backgroundColor: '#dfe6e9', marginVertical:15}} />

				<FlatList 
					data={this.props.detail.cert.evidence} 
					keyExtractor={item => item.certificateId} 
					renderItem={({item}) => {
							return (	<View>
							<View style={styles.row}>
								<Text style={styles.notes}>Shots taken: {item.dose} of {item.totalDoses}</Text>
							</View>
							
							<View style={styles.row}>
								<Text style={styles.notes}>
										Vaccine: {item.vaccine} #{item.batch}
								</Text>
							</View>
								
							<View style={styles.row}>
								<Text style={styles.notes}>
										{item.manufacturer}
								</Text>
							</View>
							</View>)
					}} />

				

				<Divider style={{ backgroundColor: '#dfe6e9', marginVertical:15}} />
				
				<View style={{flexDirection:'row', alignItems: 'center'}}>
					<FontAwesome5 style={styles.icon} name={'check-circle'} solid/>
					<Text style={styles.notes}>Signed by {this.props.detail.pub_key.toLowerCase()} on {Moment(this.props.detail.cert.issuanceDate).format('MMM DD, YYYY')}</Text>
				</View>
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	card:{
		backgroundColor:'rgba(56, 172, 236, 1)',
		borderWidth:0,
		borderRadius:20
	},
	button:{
		backgroundColor:"#00000000",
		color:'#fff',
		paddingRight: 8,
		paddingLeft: 18,
		fontSize:18
	},
	icon:{
		backgroundColor:"#00000000",
		color:'#fff',
		paddingRight: 8,
		fontSize:18
	},
	row:{
		flexDirection:'row', 
		justifyContent:'space-between'
	},
	time:{
		fontSize:38,
		color:'#fff', textTransform: 'capitalize'
	},
	notes: {
		fontSize: 18,
		color:'#fff'
	}, 
	notesCaps: {
		fontSize: 18,
		color:'#fff', 
		textTransform: 'capitalize'
	}
});