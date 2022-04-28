import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { Title, List, ActivityIndicator } from 'react-native-paper';
import Colors from '../../Constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../store/actions/user';
import { Message } from './Home.component';

/**
 *
 * @param {String} isoDateString - new Date().toISOString()
 * @returns {[String]}
 */
const processedDate = (isoDateString) => {
	let [date, time] = isoDateString.split('T');
	time = time.substr(0, 8);

	return [date, time];
};

const ListAccordion = (props) => {
	const [date, time] = processedDate(props.date);
	return (
		<List.Accordion
			title={`Order No: ${props.id}`}
			id={1}
			style={{
				elevation: 1,
				backgroundColor: 'white',
				marginBottom: 5,
			}}
		>
			{props.items.map((item) => (
				<List.Item
					title={item.productTitle}
					description={`Qty: ${item.quantity} Amt: \$${item.sum}
                    `}
					key={item.id}
				/>
			))}
			<List.Item
				title={`Total: \$${props.amount}`}
				description={`Transaction done on ${date} at ${time}`}
			/>
		</List.Accordion>
	);
};

export const OrdersScreen = ({ navigation }) => {
	const { orders } = useSelector((state) => state.user);
	const [isLoading, setIsLoading] = useState(false);
	const [_, setError] = useState(false);
	const dispatch = useDispatch();

	//fetch orders
	const fetchOrders = useCallback(async () => {
		try {
			setError(false);
			setIsLoading(true);
			await dispatch(getOrders());
		} catch (err) {
			setError({
				message: 'Something went wrong',
			});
		} finally {
			setIsLoading(false);
		}
	}, [dispatch, setError]);

	// fetcgh orders on mount

	useEffect(() => {
		fetchOrders();
	}, []);
	useEffect(() => {
		const sub = navigation.addListener('focus', fetchOrders);

		return sub;
	}, [fetchOrders]);

	if (isLoading) {
		return (
			<Message>
				<ActivityIndicator color={Colors.indigo} size="large" />
			</Message>
		);
	}

	if (!isLoading && orders.length <= 0) {
		return (
			<Message>
				<Title>You have no orders</Title>
			</Message>
		);
	}

	return (
		<View style={{ flex: 1, marginTop: 1 }}>
			<List.AccordionGroup>
				{orders.map((order) => (
					<ListAccordion
						id={order.id}
						items={order.items}
						amount={order.amount}
						date={order.created_at}
						key={order.id}
					/>
				))}
			</List.AccordionGroup>
		</View>
	);
};
