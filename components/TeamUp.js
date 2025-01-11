import {
    Text,
    View,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
    Image,
    TextInput,
    ScrollView,Button,FlatList
  } from "react-native";
import React from 'react'
import { ImageBackground } from 'react-native'
import image from '../assets/capture2.png'
import { useEffect,useRef,useState,useContext } from 'react'
import { Ionicons } from "@expo/vector-icons";
import CreateTeam from "./Team/TeamCreateManually/TeamInvite";
import JoinTeam from "./Team/TeamCreateManually/JoinTeam";
import { UserContext } from "./Team Switch/UserContext"
import { serverIP } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { setTeams } from "./Redux/Actions";

const { height } = Dimensions.get("window");

export default function TeamUp({ route, navigation }) {

  
  const [isPopupVisible, setPopupVisible] = useState(false);
  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);

    const profiles = [
        { id: '1', name: 'John Doe', age: 28 },
        { id: '2', name: 'Jane Smith', age: 34 },
        { id: '3', name: 'Alice Johnson', age: 25 },
        { id: '4', name: 'Robert Brown', age: 40 },
        { id: '5', name: 'Emily Davis', age: 30 },
        { id: '6', name: 'Michael Wilson', age: 27 },
        { id: '7', name: 'Sarah Miller', age: 32 },
        { id: '8', name: 'David Lee', age: 29 },
        { id: '9', name: 'Sophia Garcia', age: 26 },
        { id: '10', name: 'James Anderson', age: 33 },
      ];


      const renderItem = ({ item, index }) => (
        <TouchableOpacity
          key={index.toString()}
          style={styles.teamItemWrapper}
          onPress={() => handleTeamClick(index)}
        >
          <Image
            source={{
              uri: "https://images.pexels.com/photos/5642024/pexels-photo-5642024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            }}
            style={styles.itemImage}
          />
          <View style={styles.teamItemTeam}>
            <Text style={styles.teamTextTeam}>
              {item.name1} & {item.name2}
            </Text>
            <RadioButton
              selected={selectedTeamIndex === index}
              temporary={tempSelection === index}
            />
          </View>
        </TouchableOpacity>
      );
    

      
      const renderProfile = ({ item }) => (
        <View style={styles.profileCard}>
          <Text style={styles.profileName}>{item.name}</Text>
          <Text style={styles.profileAge}>Age: {item.age}</Text>
        </View>
      );


    const {
        userId,
        refreshYourTeam,
        mobileNumber,
        dispatch,
        userName,
        fetchTeams,
        error,
      } = route.params;
      console.log("USER ID ---->", userId);
      const [isPopup1Visible, setPopup1Visible] = useState(false);
      const [isPopup2Visible, setPopup2Visible] = useState(false);
    
      const openPopup1 = () => {
        setPopup1Visible(true);
      };
    
      const closePopup1 = () => {
        setPopup1Visible(false);
      };
    
      const openPopup2 = () => {
        setPopup2Visible(true);
      };
    
      const closePopup2 = () => {
        setPopup2Visible(false);
      };
    
      // Pop up modal code
    
      //Team Selection Code
      //const [teams, setTeams] = useState([]);
      const teams = useSelector((state) => state.teams);
      //const [error, setError] = useState("");
      const [tempSelection, setTempSelection] = useState(null);
      const { selectedTeamIndex, setSelectedTeamIndex } = useContext(UserContext);
    
      useEffect(() => {
        // fetchTeams();
      }, []);
    
      const fetchTeams1 = async () => {
        try {
          const response = await fetch(
            `${serverIP}/auth/get-your-team?userId=${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          if (!response.ok) {
            throw new Error("Failed to fetch your team");
          }
    
          const responseData = await response.json();
          console.log(responseData, "REES");
          dispatch(setTeams(responseData));
          setError("");
        } catch (err) {
          console.error("Error fetching team data:", err);
          setError("Please create your teams.");
        }
      };
    
      const handleTeamClick = (index) => {
        setTempSelection(index);
      };
    
      const handleConfirmSelection = async () => {
        if (tempSelection !== null) {
          setSelectedTeamIndex(tempSelection);
          await AsyncStorage.setItem(
            "selectedTeamIndex",
            selectedTeamIndex.toString()
          );
          setTempSelection(null);
          refreshYourTeam();
          navigation.navigate("Home");
        }
      };
    
      const RadioButton = ({ selected, temporary }) => (
        <View
          style={[
            styles.radioButton,
            selected
              ? styles.radioButtonSelected
              : temporary
              ? styles.radioButtonTemporary
              : styles.radioButtonDefault,
          ]}
        />
      );
    
      // Calculate 20% of screen height
      const screenHeight = Dimensions.get("window").height;
      const scrollContainerHeight = screenHeight * 0.3;
    
      //Team Selection Code
    
      // const [isModalVisible, setModalVisible] = useState(true);
      const translateY = useRef(new Animated.Value(height)).current;
      //const navigation = useNavigation();
      const [selectedProfileId, setSelectedProfileId] = useState(null);
      const [showView, setShowView] = useState(true);
    
      useEffect(() => {
        Animated.spring(translateY, {
          toValue: height * 0.26,
          useNativeDriver: true,
        }).start();
      }, []);
    
      const navigateToHomeScreen = () => {
        // setModalVisible(true);
        navigation.navigate("Home");
        setShowView(true);
      };
    
      const handleRadioButtonPress = (id) => {
        setSelectedProfileId(id);
      };
    
      const changeSwitchState = () => {
        console.log("EG");
        if (showView) {
          setShowView(false);
        } else {
          setShowView(true);
        }
      };


  return (
    <ImageBackground source={image}  style={styles.background}>
      
      <View style={styles.whiteScreen}>
                <View
                   style={{flex:1,flexDirection:'column',marginTop:'4%',gap:8}}
                 >
                    <View style={{flexDirection:'row'}}>
                    <Ionicons name={"shuffle"} size={20} color={"#45474B"} />
                    <Text style={{color:'#45474B',fontWeight:'500',marginTop:'0.5%'}}>Switch Teams</Text>
                   </View>
                   <View >
                   <TouchableOpacity onPress={openPopup} style={{flexDirection:'row',gap:8,paddingLeft:'4%',paddingVertical:'4%'}}>
                        <View style={{backgroundColor:'#FF315633',borderRadius:16}}>
                            <Ionicons
                                name="add"
                                size={20}
                                color="#FF3156"                  
                            />
                        </View>
                        <View>
                            
                            <Text style={{color:"#FF3156",fontSize:16}}>Create new team</Text>
                           
                            
                        </View>
                        </TouchableOpacity>
                   </View>
                   {teams.length > 0 ? (
        <FlatList
          data={teams}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noTeamsTextTeam}>No teams available.</Text>
      )}

                 </View>
      </View>
      <View style={styles.whiteScreen1}>
                <View
                   style={{flex:1,flexDirection:'column',marginTop:'4%',gap:8}}
                 >
        <View style={styles.buttonContainer}>
                 <TouchableOpacity
                        style={styles.actionButton}
                        onPress={navigateToHomeScreen}
                      >
                        <View style={styles.buttonContainer1}>
                          <Text style={styles.buttonText}>Back</Text>
                        </View>
                 </TouchableOpacity>

                 <TouchableOpacity
                        onPress={handleConfirmSelection}
                        style={styles.actionButton}
                  >
                         <View style={styles.buttonContainer2}>
                         <Text style={styles.buttonText}>Switch</Text>
                        </View>
                </TouchableOpacity>
          
        </View>
                 </View>
      </View>

      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPopupVisible}
        onRequestClose={closePopup}
      >
        <View style={styles.modalContainer}>
          <View style={styles.whiteScreen2}>
            {/* Close Button */}
            <TouchableOpacity onPress={closePopup} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#45474B" />
            </TouchableOpacity>
            <View style={styles.popupContainer}>
                    <View style={styles.popup}>
                      <View>
                        <CreateTeam
                          mobileNumber={mobileNumber}
                          fetchTeams={fetchTeams1}
                          userId={userId}
                          userName={userName}
                        />
                      </View>
                    </View>
                  </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        resizeMode: 'cover', // Ensures the background image covers the entire screen
      },
      whiteScreen: {
        position: 'absolute',
        bottom: 0,
        height: height * 0.4, // Takes 60% of the screen height
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 }, // Shadow appears on the top
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Shadow for Android
        paddingHorizontal: 20,
        paddingBottom: 20,
        marginBottom:'10%'
      },
      whiteScreen1: {
        position: 'absolute',
        bottom: 0,
        height: height * 0.11, // Takes 60% of the screen height
        width: '100%',
        backgroundColor: 'white',
        elevation: 5, // Shadow for Android
        paddingHorizontal: 10,
        paddingBottom: 20,
      },

 flatList: {
    height: 200, // Fixed height for FlatList, even when there's no data
    marginLeft:'2%'
  },

  itemImage: {
    width: 49,
    height: 49,
    borderRadius: 25,
    marginRight: 10,
  },

  noTeamsTextTeam: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
      
      text: {
        fontSize: 16,
        color: 'black',
        lineHeight: 24,
      },
      buttonContainer: {
        marginTop: 10, // Adds spacing between scroll view and buttons
        flexDirection: 'row', // Stacks buttons vertically
      },
      

      // imported from old team Screen

      container: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#EDEEF1",
      },
      modalBackground: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#B6D0E2",
        zIndex:10
        // marginTop: 55,
      },
      animatedView: {
        flex:1,
        height: "60%", // 40% of the screen height
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: "center",
        //borderWidth: 2,
      },
      title: {
        fontSize: 15,
        fontWeight: "500",
        marginLeft: 10,
        marginTop: 2,
        color: "#45474B",
        lineHeight: 18.15,
      },
      button: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        //backgroundColor: "#ccc",
        borderRadius: 5,
        position: "absolute",
        top: -55,
        left: 25,
      },
      createTeamBtnText: {
        fontSize: 16,
        color: "#FF3156",
        marginRight: 5,
      },
      actionContainer2: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20,
        paddingLeft: '5%',
        paddingVertical:'4%',
        position: "relative",
        bottom: "6%",
        marginTop: '53%',
        marginBottom: 3,
        backgroundColor: "white",
      },
      actionButton: {
        flex: 1,
        marginHorizontal: '2%',
      },
      buttonContainer1: {
        backgroundColor: "#6420AA",
        borderRadius: 35,
        paddingVertical: 13,
        paddingHorizontal: 10,
        alignItems: "center",
        width: "100%",
        height: 49,
      },
      buttonContainer2: {
        backgroundColor: "#FF3156",
        borderRadius: 35,
        paddingVertical: 13,
        paddingHorizontal: 10,
        alignItems: "center",
        width: "100%",
        height: 49,
        
      },
      buttonText: {
        color: "white",
        fontSize: 16,

      },
      switchContainer: {
        flex: 0.1,
        flexDirection: "row",
        alignSelf: "flex-start",
        // backgroundColor: "pink",
        width: "40%",
      },

      headerProfile: {
        flexDirection: "column",
        width: 123,
      },
      nameContainer: {
        // marginRight: 0,
        fontSize: 18,
        color: "#121212",
      },
      iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: 35,
      },
      matchTextContainer: {
        fontSize: 12,
      },
      icon: {
        backgroundColor: "#fff",
        borderRadius: 12,
        color: "#000",
        marginHorizontal: 5,
      },
      profileContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        margin: 5,
      },
      profileImage: {
        width: 45,
        height: 45,
        borderRadius: 55.87,
        marginHorizontal: 10,
        position: "relative",
        bottom: 5,
      },
      profileDetails: {
        // marginLeft: 10,
        marginRight: 100,
        position: "relative",
        bottom: 6,
      },
      profileText: {
        color: "#212121",
        fontSize: 12,
      },
      profileView: {
        // backgroundColor: "#ccc",
        position: "absolute",
        top: "20%",
      },
      notifView: {
        flexDirection: "row",
      },
      radioButtonContainer: {
        marginRight: 10,
      },
      radioButton: {
        height: 18,
        width: 18,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#45474B",
        alignItems: "center",
        justifyContent: "center",
      },
      radioButtonSelected: {
        height: 12,
        width: 12,
        borderRadius: 5,
        backgroundColor: "#FF3156",
      },
      backButton: {
        flexDirection: "row",
        alignItems: "center",
      },
      backButtonText: {
        marginLeft: 2,
        fontSize: 22,
        color: "#121212",
      },
      textInput: {
        width: 300,
        height: 84,
        borderColor: "#ccc",
        borderWidth: 1,
        paddingHorizontal: 10,
        marginLeft: 30,
        marginVertical: 25,
        color: "#0000FF",
      },
    
      // new Scroll Styling
    
      scrollContainer: {
        flex:1,
        marginBottom:'8%',
        height: '40%', // Set the height to a fixed percentage (as per your requirement)
        width: '95%', // Ensure full width of the screen
      },
      scrollContent: {
        flexGrow: 1, // Allow the ScrollView's content to expand beyond the view height
        marginTop:'-15%',
        
      },
      itemsContainer: {
        paddingVertical: '10%', // Add padding to the items
        marginBottom:'10%'
      },
      teamItemWrapper: {
        flexDirection: 'row', // Align items in a row
        alignItems: 'center',
        marginVertical: '2%',
        //marginBottom:'4%',
        gap:10
      },
      teamItemTeam: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight:'8%',
        flex: 1, // Make the team info take up remaining space
      },
      noTeamsTextTeam: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
      },
      // new Scroll Styling
    
      // Team Styling
      containerTeam: {
        flex: 1,
      },
      headingTeam: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
      },
      teamTextTeam: {
        fontSize: 20,
        fontWeight: "500",
        flexShrink: 1,
      },
      noTeamsTextTeam: {
        fontSize: 18,
        textAlign: "center",
        color: "#888",
      },
      errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginBottom: 20,
      },
      radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#444",
        alignItems: "center",
        justifyContent: "center",
      },
      radioButtonSelected: {
        backgroundColor: "#FF3156",
      },
      radioButtonTemporary: {
        backgroundColor: "green",
      },
      radioButtonDefault: {
        backgroundColor: "transparent",
      },
      // Pop up styling
    
      containerPopup: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      openButton: {
        backgroundColor: "#007bff",
        padding: 15,
        margin: 10,
        borderRadius: 10,
      },
      buttonText: {
        color: "#fff",
        fontSize: 16,
      },
      popupContainer: {
        flex: 1,
        justifyContent: "flex-end",
      },
      popup: {
        height: "88%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        elevation: 10,
      },
      closeButton: {
        position: "absolute",
        top: '1%',
        right: '1%',
        // backgroundColor: '#ff0000',
        borderRadius: 15,
        padding: 5,
      },
      closeButtonText: {
        color: "black",
        fontWeight: "bold",
      },
      popupText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 40,
      },
      itemContainer: {
        flexDirection: "row", // Align items horizontally
        alignItems: "center", // Center items vertically
        padding: 10,
      },


      // Modal styling

      modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      fullScreenModal: {
        height: "90%",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
      },
      modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#45474B",
      },
      modalContent: {
        flex: 1,
      },
      modalText: {
        fontSize: 16,
        color: "#45474B",
        marginBottom: 10,
      },
      confirmButton: {
        backgroundColor: "#FF3156",
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
      },
      confirmButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
      },

      whiteScreen2: {
        height: "90%",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
      },
      closeButton: {
        alignSelf: "flex-end",
      },

})