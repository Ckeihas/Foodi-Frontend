import React from "react";
import { View, StyleSheet, FlatList, Text, Image, Dimensions, SafeAreaView, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UsersPostsParams } from "../../navigation/UserPostsStack";
import userInfo from "../../mobx/UserInfo";

const data = [
    {
        imageURL: 'https://firebasestorage.googleapis.com/v0/b/foodi-app-8e777.appspot.com/o/posts%2F7c3b8e57-e467-4f28-af7d-2e39555b21c2?alt=media&token=b4873d15-6dda-4034-8606-da57031bd0c3',
        extendedIngredients: [
            {amount: 1, id: '1' , name: 'porkkana', unit: 'kpl'},
            {amount: 3, id: '2' , name: 'Rahka', unit: 'kpl'},
            {amount: 2, id: '3' , name: 'Murot', unit: 'kpl'},
            {amount: 4, id: '4' , name: 'Jauheliha', unit: 'kpl'}
        ],
        instructions: [
            {steps: [
                {number: 1, step: "ohjeita tulee tässä näin jotain höpötihöö"},
                {number: 2, step: "vähän lisää jotain tekstiä jeejeejeejejejej"},
                {number: 3, step: "lorum ipsum lorotilollopekka poutapää"},
                {number: 4, step: "lorum ipsum dipsun nipsun kimpsun kampsun"},
                {number: 5, step: "vesi hiisi sihisi hississä ärrä kierrän korren ympärin"},
            ]}
        ],
        title: 'Herra TarTar',
        description: 'Maailman söpöin koiraotus ja otus mitä on ylipäätänsä :)))))))'
    },
    {
        imageURL: 'https://firebasestorage.googleapis.com/v0/b/foodi-app-8e777.appspot.com/o/posts%2F7c3b8e57-e467-4f28-af7d-2e39555b21c2?alt=media&token=b4873d15-6dda-4034-8606-da57031bd0c3',
        extendedIngredients: [
            {amount: 1, id: '1' , name: 'porkkana', unit: 'kpl'},
            {amount: 3, id: '2' , name: 'Rahka', unit: 'kpl'},
            {amount: 2, id: '3' , name: 'Murot', unit: 'kpl'},
            {amount: 4, id: '4' , name: 'Jauheliha', unit: 'kpl'}
        ],
        instructions: [
            {steps: [
                {number: 1, step: "ohjeita tulee tässä näin jotain höpötihöö"},
                {number: 2, step: "vähän lisää jotain tekstiä jeejeejeejejejej"},
                {number: 3, step: "lorum ipsum lorotilollopekka poutapää"},
                {number: 4, step: "lorum ipsum dipsun nipsun kimpsun kampsun"},
                {number: 5, step: "vesi hiisi sihisi hississä ärrä kierrän korren ympärin"},
            ]}
        ],
        title: 'Herra TarTar',
        description: 'Maailman söpöin koiraotus ja otus mitä on ylipäätänsä :)))))))'
    },
    {
        imageURL: 'https://firebasestorage.googleapis.com/v0/b/foodi-app-8e777.appspot.com/o/posts%2F7c3b8e57-e467-4f28-af7d-2e39555b21c2?alt=media&token=b4873d15-6dda-4034-8606-da57031bd0c3',
        extendedIngredients: [
            {amount: 1, id: '1' , name: 'porkkana', unit: 'kpl'},
            {amount: 3, id: '2' , name: 'Rahka', unit: 'kpl'},
            {amount: 2, id: '3' , name: 'Murot', unit: 'kpl'},
            {amount: 4, id: '4' , name: 'Jauheliha', unit: 'kpl'}
        ],
        instructions: [
            {steps: [
                {number: 1, step: "ohjeita tulee tässä näin jotain höpötihöö"},
                {number: 2, step: "vähän lisää jotain tekstiä jeejeejeejejejej"},
                {number: 3, step: "lorum ipsum lorotilollopekka poutapää"},
                {number: 4, step: "lorum ipsum dipsun nipsun kimpsun kampsun"},
                {number: 5, step: "vesi hiisi sihisi hississä ärrä kierrän korren ympärin"},
            ]}
        ],
        title: 'Herra TarTar',
        description: 'Maailman söpöin koiraotus ja otus mitä on ylipäätänsä :)))))))'
    },
    {
        imageURL: 'https://firebasestorage.googleapis.com/v0/b/foodi-app-8e777.appspot.com/o/posts%2F7c3b8e57-e467-4f28-af7d-2e39555b21c2?alt=media&token=b4873d15-6dda-4034-8606-da57031bd0c3',
        extendedIngredients: [
            {amount: 1, id: '1' , name: 'porkkana', unit: 'kpl'},
            {amount: 3, id: '2' , name: 'Rahka', unit: 'kpl'},
            {amount: 2, id: '3' , name: 'Murot', unit: 'kpl'},
            {amount: 4, id: '4' , name: 'Jauheliha', unit: 'kpl'}
        ],
        instructions: [
            {steps: [
                {number: 1, step: "ohjeita tulee tässä näin jotain höpötihöö"},
                {number: 2, step: "vähän lisää jotain tekstiä jeejeejeejejejej"},
                {number: 3, step: "lorum ipsum lorotilollopekka poutapää"},
                {number: 4, step: "lorum ipsum dipsun nipsun kimpsun kampsun"},
                {number: 5, step: "vesi hiisi sihisi hississä ärrä kierrän korren ympärin"},
            ]}
        ],
        title: 'Herra TarTar',
        description: 'Maailman söpöin koiraotus ja otus mitä on ylipäätänsä :)))))))'
    },
    {
        imageURL: 'https://firebasestorage.googleapis.com/v0/b/foodi-app-8e777.appspot.com/o/posts%2F7c3b8e57-e467-4f28-af7d-2e39555b21c2?alt=media&token=b4873d15-6dda-4034-8606-da57031bd0c3',
        extendedIngredients: [
            {amount: 1, id: '1' , name: 'porkkana', unit: 'kpl'},
            {amount: 3, id: '2' , name: 'Rahka', unit: 'kpl'},
            {amount: 2, id: '3' , name: 'Murot', unit: 'kpl'},
            {amount: 4, id: '4' , name: 'Jauheliha', unit: 'kpl'}
        ],
        instructions: [
            {steps: [
                {number: 1, step: "ohjeita tulee tässä näin jotain höpötihöö"},
                {number: 2, step: "vähän lisää jotain tekstiä jeejeejeejejejej"},
                {number: 3, step: "lorum ipsum lorotilollopekka poutapää"},
                {number: 4, step: "lorum ipsum dipsun nipsun kimpsun kampsun"},
                {number: 5, step: "vesi hiisi sihisi hississä ärrä kierrän korren ympärin"},
            ]}
        ],
        title: 'Herra TarTar',
        description: 'Maailman söpöin koiraotus ja otus mitä on ylipäätänsä :)))))))'
    },
    {
        imageURL: 'https://firebasestorage.googleapis.com/v0/b/foodi-app-8e777.appspot.com/o/posts%2F7c3b8e57-e467-4f28-af7d-2e39555b21c2?alt=media&token=b4873d15-6dda-4034-8606-da57031bd0c3',
        extendedIngredients: [
            {amount: 1, id: '1' , name: 'porkkana', unit: 'kpl'},
            {amount: 3, id: '2' , name: 'Rahka', unit: 'kpl'},
            {amount: 2, id: '3' , name: 'Murot', unit: 'kpl'},
            {amount: 4, id: '4' , name: 'Jauheliha', unit: 'kpl'}
        ],
        instructions: [
            {steps: [
                {number: 1, step: "ohjeita tulee tässä näin jotain höpötihöö"},
                {number: 2, step: "vähän lisää jotain tekstiä jeejeejeejejejej"},
                {number: 3, step: "lorum ipsum lorotilollopekka poutapää"},
                {number: 4, step: "lorum ipsum dipsun nipsun kimpsun kampsun"},
                {number: 5, step: "vesi hiisi sihisi hississä ärrä kierrän korren ympärin"},
            ]}
        ],
        title: 'Herra TarTar',
        description: 'Maailman söpöin koiraotus ja otus mitä on ylipäätänsä :)))))))'
    },
    {
        imageURL: 'https://firebasestorage.googleapis.com/v0/b/foodi-app-8e777.appspot.com/o/posts%2F7c3b8e57-e467-4f28-af7d-2e39555b21c2?alt=media&token=b4873d15-6dda-4034-8606-da57031bd0c3',
        extendedIngredients: [
            {amount: 1, id: '1' , name: 'porkkana', unit: 'kpl'},
            {amount: 3, id: '2' , name: 'Rahka', unit: 'kpl'},
            {amount: 2, id: '3' , name: 'Murot', unit: 'kpl'},
            {amount: 4, id: '4' , name: 'Jauheliha', unit: 'kpl'}
        ],
        instructions: [
            {steps: [
                {number: 1, step: "ohjeita tulee tässä näin jotain höpötihöö"},
                {number: 2, step: "vähän lisää jotain tekstiä jeejeejeejejejej"},
                {number: 3, step: "lorum ipsum lorotilollopekka poutapää"},
                {number: 4, step: "lorum ipsum dipsun nipsun kimpsun kampsun"},
                {number: 5, step: "vesi hiisi sihisi hississä ärrä kierrän korren ympärin"},
            ]}
        ],
        title: 'Herra TarTar',
        description: 'Maailman söpöin koiraotus ja otus mitä on ylipäätänsä :)))))))'
    }
]

type Ingredients = {
    amount: number,
    id: string,
    name: string,
    unit: string
};
interface Step {
    number: number;
    step: string;
  }
  
//   interface Instructions {
//     steps: Step[];
//   }

interface Instructions {
    id: string, 
    text: string
  }

interface PostItem {
    imageURL: string;
    title: string;
    description: string;
    extendedIngredients: Ingredients[];
    analyzedInstructions: Instructions[];
    id: string;
    username: string
}

const { width, height } = Dimensions.get('window');

export default function FriendsPostFlatlist(){
    const navigation = useNavigation<NativeStackNavigationProp<UsersPostsParams>>();
    console.log("Posts: ", userInfo.userFriendsPosts)
    const renderFlatListItem = ({item}: {item: PostItem}) => {
        return(
            <View style={styles.postCardCont}>
                <View style={styles.postContents}>
                    <View style={styles.postOwnerCont}>
                        <Image source={require('../../../assets/profile1.jpg')} style={styles.postOwnerImg}/>
                        <View style={styles.usernameTimeCont}>
                            <Text style={styles.username}>{item.username}</Text>
                            <Text style={styles.time}>4h ago</Text>
                        </View>
                    </View>
                    <View style={styles.descriptionCont}>
                        <Text style={styles.descriptionText}>{item.description}</Text>
                    </View>
                    <Image source={{uri: item.imageURL}} style={styles.postImg}/>
                    <View style={styles.postStatsCont}>
                        <View style={styles.likeAndSaveCont}>
                            <AntDesign name="like2" size={24} color="black" />
                            <Ionicons name="download-outline" size={24} color="black" style={styles.saveIcon}/>
                        </View>
                        <View style={styles.likesCont}>
                            <Text style={styles.likeHeader}>Likes</Text>
                            <Text style={styles.likes}>345</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('postDetails', {
                            extendedIngredients: item.extendedIngredients,
                            analyzedInstructions: item.analyzedInstructions,
                            imageURL: item.imageURL,
                            description: item.description,
                            title: item.title,
                            id: item.id,
                            username: item.username
                        })}>
                            <Feather name="book-open" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>             
            </View>
        )
    }
    return(
        <SafeAreaView style={styles.container}>
            <FlatList 
            data={userInfo.userFriendsPosts}
            renderItem={renderFlatListItem}
            contentContainerStyle={styles.flatlistStyle}
            />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    postCardCont: {
        flexDirection: 'column',
        marginBottom: 60
    },
    postContents: {
        alignItems: 'center',
        width: width,
        marginVertical: 10
    },
    postImg: {
        width: width / 1.2,
        height: 320,
        borderRadius: 20,
    },
    postOwnerCont: {
        width: width / 1.2,
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    postOwnerImg: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    flatlistStyle: {
        alignItems: 'center'
    },
    usernameTimeCont: {
        marginLeft: 10
    },
    username: {
        fontWeight: 'bold',
        fontSize: 14
    },
    time: {
        color: 'darkgray',
        
    },
    descriptionCont: {
        width: width / 1.2,
        marginVertical: 16
    },
    descriptionText: {
        color: '#6A6A6A',
        fontWeight: '500'
    },
    postStatsCont: {
        flexDirection: 'row',
        width: width / 1.2,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    likeAndSaveCont: {
        flexDirection: 'row',
    },
    saveIcon: {
        left: 40,
        position: 'absolute'
    },
    likesCont: {
        alignItems: 'center'
    },
    likeHeader: {
        color: 'gray',
        fontSize: 12,
        fontWeight: '600'
    },
    likes: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})