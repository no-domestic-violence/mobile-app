import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native'

const { width, height } = Dimensions.get('window')

const ArticleCard = ({ item, navigation }) => {
    console.log(item)
    return (
        <View style={styles.cardView}>
            <TouchableOpacity onPress={() => navigation.navigate('Article Page', {id: item._id})}>
                <Text style={styles.title}> {item.title}</Text>
                <Text style={styles.author}>{item.author} </Text>
                <Image style={styles.image} source={item.urlToImage ? { uri: item.urlToImage } : null} />
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.violence_type}>{item.violence_type}</Text>
                <Text style={styles.created_at}>{item.created_at}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        backgroundColor: 'white',
        margin: width * 0.03,
        borderRadius: width * 0.05,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3
    },
    title: {
        marginHorizontal: width * 0.05,
        marginVertical: width * 0.03,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'

    },
    description: {
        marginVertical: width * 0.05,
        marginHorizontal: width * 0.02,
        color: 'gray',
        fontSize: 18
    },
    image: {
        height: height / 6,
        marginLeft: width * 0.05,
        marginRight: width * 0.05,
        marginVertical: height * 0.02
    },
    author: {
        marginBottom: width * 0.0,
        marginHorizontal: width * 0.05,
        fontSize: 15,
        color: 'gray'

    },
    violence_type: {
        marginTop: width * 0.0,
        marginHorizontal: width * 0.03,
        fontSize: 10,
        color: 'gray'

    },
    created_at: {

        marginBottom: width * 0.0,
        marginHorizontal: width * 0.05,
        fontSize: 8,
        color: 'gray'

    }
})

export default ArticleCard;