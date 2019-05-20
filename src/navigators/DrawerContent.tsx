import * as React from 'react'
import { View, ViewStyle, Text, TextStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon, Thumbnail } from 'native-base'

const iconContainer = (onPressed: () => void) => (
	<View style={ICON_CONTAINER}>
		<TouchableOpacity style={ICON_TOUCHABLE} onPress={onPressed}>
			<Icon name="arrow-back" />
		</TouchableOpacity>
	</View>
)
const topContainer = () => (
	<View style={TOP_CONTAINER}>
		{profileView()}
		{drawerItem('person', 'My Profile')}
		{drawerItem('notifications', 'Notifications')}
		{drawerItem('chatbubbles', 'Messages')}
		{drawerItem('settings', 'Settings')}
	</View>
)

const drawerItem = (icon: string, label: string) => (
	<View style={ITEM_CONTAINER}>
		<Icon name={icon} style={{ width: 60, color: 'grey' }} />
		<Text style={ITEM_LABEL}>{label}</Text>
	</View>
)

const profileView = () => (
	<View style={PROFILE_CONTAINER}>
		<Thumbnail
			large
			source={{
				uri: 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png'
			}}
			circular={true}
		/>
		<Text style={USERNAME_LABEL}>Perfect User</Text>
		<Text style={EMAIL_LABEL}>perfectuser@example.com</Text>
		<View style={SEPARATOR} />
	</View>
)

const bottomContainer = () => (
	<View style={BOTTOM_CONTAINER}>
		<Icon name="log-out" />
		<Text style={ITEM_LABEL}>Log Out</Text>
	</View>
)

const DrawerContent: React.FunctionComponent = (props: any) => {
	return (
		<View style={DRAWER_CONTAINER}>
			{iconContainer(props.navigation.closeDrawer)}
			{topContainer()}
			{bottomContainer()}
		</View>
	)
}

export default DrawerContent

const DRAWER_CONTAINER: ViewStyle = {
	flex: 1,
	height: '100%'
}

const ICON_CONTAINER: ViewStyle = {
	height: 90,
	alignItems: 'flex-start',
	justifyContent: 'flex-end'
}

const ICON_TOUCHABLE: ViewStyle = {
	width: 40,
	height: 40,
	alignItems: 'center',
	justifyContent: 'center'
}

const TOP_CONTAINER: ViewStyle = {
	flex: 1,
	paddingHorizontal: 40
}

const PROFILE_CONTAINER: ViewStyle = {
	alignItems: 'center',
	justifyContent: 'center',
	height: 250
}

const USERNAME_LABEL: TextStyle = {
	fontSize: 20,
	marginVertical: 4
}

const EMAIL_LABEL: TextStyle = {
	fontSize: 16,
	opacity: 0.9,
	marginVertical: 2
}

const SEPARATOR: ViewStyle = {
	width: '100%',
	height: 1,
	backgroundColor: 'grey',
	marginTop: 40,
	marginBottom: 20
}

const ITEM_CONTAINER: ViewStyle = {
	height: 70,
	alignItems: 'flex-start',
	justifyContent: 'flex-start',
	width: '100%',
	flexDirection: 'row'
}

const BOTTOM_CONTAINER: ViewStyle = {
	height: 80,
	flexDirection: 'row',
	paddingHorizontal: 40,
	paddingVertical: 10,
	borderTopColor: 'grey',
	borderTopWidth: 1,
	alignItems: 'center',
	justifyContent: 'flex-start'
}

const ITEM_LABEL: TextStyle = {
	fontSize: 20,
	color: 'grey',
	marginHorizontal: 10,
	marginBottom: 3
}
