import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { toggleEditButtonAndBio } from "../Redux/Actions";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  FontAwesome6,
  SimpleLineIcons,
  AntDesign,
} from "@expo/vector-icons";
import Tags from "react-native-tags";
import { serverIP } from "@/config";

const profiles = [
  {
    id: 1,
    imageSource: require("../../assets/profile-1.jpg"),
    name1: "Neha",
    age1: 25,
    name2: "Shruthi",
    age2: 24,
    location: "2 km away",
    description:
      "Your go to adventure enthusiast and amateur stand-up comedian",
    ourStory:
      "We met at a comedy show where shruthi was performing her stand-up routine and Neha was in the audience",
    funDate:
      "Hiking in the mountains, laughing, roasting marshmallows and sharing stories",
    singleImage1: require("../../assets/image20.jpg"),
    singleImage2: require("../../assets/image21.jpg"),
  },
  {
    id: 2,
    imageSource: require("../../assets/profile-2.png"),
    name1: "Anusha",
    age1: 24,
    name2: "Nikitha",
    age2: 26,
    location: "3 km away",
    description: "Crazy cat lady who is as crazy as a cat who loves to explore",
    ourStory: "We met at a coffee shop and bonded over our love for cats",
    funDate: "Visiting a cat café and having a cat-themed movie marathon",
  },
  {
    id: 3,
    imageSource: require("../../assets/profile-3.png"),
    name1: "Julia",
    age1: 27,
    name2: "Jenny",
    age2: 24,
    location: "4 km away",
    description:
      "Your go to adventure enthusiast and amateur stand-up comedian",
    ourStory:
      "We met at a hiking event and instantly clicked while exploring nature",
    funDate: "Going on a spontaneous road trip to explore new hiking trails",
  },
  {
    id: 4,
    imageSource: require("../../assets/profile-4.png"),
    name1: "Shivani",
    age1: 23,
    name2: "Chandini",
    age2: 25,
    location: "10 km away",
    description:
      "We love to travel and experience new places, cultures, animals etc",
    ourStory:
      "We met while traveling solo in Europe and decided to explore the rest of the trip together",
    funDate:
      "Attending a cultural festival in a foreign country and trying out exotic foods",
  },
  // Add more profiles as needed
];

const TeamProfileDetails = ({ route, navigation }) => {
  const { profile } = route.params;
  console.log(profile, "DF");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const tagInputRef = useRef(null);
  const [teamId, setTeamId] = useState(profile._id);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [text, setText] = useState(
    "We met at a comedy show where Shruti was performing her stand-up routine, and Neha was in the audience"
  );
  const [isDateNightEditing, setIsDateNightEditing] = useState(false);
  const [dateNightText, setDateNightText] = useState(
    "My ideal date night would involve a cozy dinner at a candlelit restaurant followed by a leisurely stroll under the stars."
  );

  const [talkEditing, setIsTalkEditing] = useState(false);
  const [talkText, setIsTalkText] = useState(
    "Travel experiences, culinary adventures, Pride and Prejudice"
  );

  const [likeTextEditing, setIsLikeTextEditing] = useState(false);
  const [likeText, setIsLikeText] = useState(
    "You are passionate about your interests, have a great sense of humor."
  );

  const [isPromptEditing, setIsPromptEditing] = useState(false);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [inputText, setInputText] = useState("");
  const [promptText, setPromptText] = useState(null);

  const [currentProfileIndex, setCurrentProfileIndex] = useState(
    profiles.length - 1
  );

  const currentIndexRef = useRef(currentProfileIndex);
  const scrollViewRef = useRef(null);

  const prompts = [
    "🗣️ I can talk for hours about",
    "🕯️ Ideal Date Night",
    "🌟 I would like you if",
    "🌟 I love talking about",
  ];

  //  const navigation = useNavigation();
  const handleEdit = (index, contentValue) => {
    setIsEditing(index);
    setEditText(contentValue);
  };

  const handleDone = async (index, contentId) => {
    try {
      // Update dynamicContent in the front-end
      const updatedContent = {
        ...profile.dynamicContent[index],
        value: editText,
      };
      profile.dynamicContent[index] = updatedContent;
      console.log("ID", contentId);

      // Send updated content to the back-end
      const response = await fetch(
        `${serverIP}/edit/update-your-team?contentId=${contentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContent),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update content.");
      }

      setIsEditing(null); // Reset editing state
      alert("Content updated successfully!");
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Error updating content");
    }
  };

  const handleDateNightEdit = () => {
    setIsDateNightEditing(true);
  };

  const handleTalkEdit = () => {
    setIsTalkEditing(true);
  };

  // const handleDone = () => {
  //   setIsEditing(false);
  //   // Perform any actions you need with the updated text
  // };

  const handleDateNightDone = () => {
    setIsDateNightEditing(false);
    // Perform any actions you need with the updated text
  };
  const handleTalking = () => {
    setIsTalkEditing(false);
    // Perform any actions you need with the updated text
  };

  const handlelikeEdit = () => {
    setIsLikeTextEditing(true);
  };
  const handleLiking = () => {
    setIsLikeTextEditing(false);
  };
  const handleAddTag = () => {
    if (tagInput.trim() === "") return;
    setTags([...tags, tagInput]);
    setTagInput("");
    tagInputRef.current.clear();
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleEditButtonAndBio());
  }, []);

  const navigateToPromptScreen = () => {
    // navigation.navigate("PromptScreen");
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const selectPrompt = (prompt) => {
    setSelectedPrompt(prompt);
    setIsDropdownVisible(false);
  };

  const handlePromptDone = async () => {
    // Send the new prompt to the back-end
    try {
      const response = await fetch(
        `${serverIP}/edit/add-new-prompts?teamId=${teamId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ label: selectedPrompt, value: inputText }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // Update state with the new prompt
        setPromptText(inputText);
        setSelectedPrompt("");
        setInputText("");
        setIsPromptEditing(false);
        // Optionally update the prompts array or handle new prompt data
      } else {
        console.error("Error adding prompt:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = () => {
    setPromptText(null);
    setInputText("");
  };
  const handlePromptEdit = () => {
    setIsPromptEditing(false);
  };

  // Function to render profile pictures
  const renderProfilePictures = () => {
    const renderedImages = profiles.map((profile, index) => (
      <TouchableOpacity key={index} onPress={() => handleImagePress(profile)}>
        <Image source={profile.imageSource} style={styles.pictureBox} />
      </TouchableOpacity>
    ));

    // Check if the number of images is less than 5 to render the empty box with the '+' icon
    if (profiles.length < 6) {
      const emptyBox = (
        <TouchableOpacity onPress={() => handleUploadImage()}>
          <View style={[styles.pictureBox, styles.emptyBox]}>
            <Text style={styles.plusIcon}>+</Text>
          </View>
        </TouchableOpacity>
      );
      renderedImages.push(emptyBox);
    }

    return renderedImages;
    // return profiles.map((profile, index) => (
    //   <TouchableOpacity key={index} onPress={() => handleImagePress(profile)}>
    //     <Image source={profile.imageSource} style={styles.pictureBox} />
    //   </TouchableOpacity>
    // ));
  };

  // Function to handle image press
  const handleImagePress = (profile) => {
    // Handle image press here
  };

  const navigateToInitialProfile = () => {
    navigation.navigate("TeamProfile");
  };
  return (
    <ScrollView>
      <View style={styles.headContainer}>
        <Text style={styles.headText}>Team Profile</Text>
        <TouchableOpacity
          style={styles.donButton}
          onPress={navigateToInitialProfile}
        >
          <Text style={styles.doneText1}>Done</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.viewContainer}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchText}>🎨 Our Interests</Text>
        </View>
        <View style={styles.renderedTagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text>{tag}</Text>
              <TouchableOpacity onPress={() => handleRemoveTag(index)}>
                <Text style={styles.removeButton}>x</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.textInput}>
          <Tags
            initialTags={tags}
            containerStyle={styles.tagsInputContainer}
            inputStyle={styles.tagsInput}
            onTagPress={(index, tagLabel, event, deleted) =>
              !deleted && handleRemoveTag(index)
            }
          />
          <TextInput
            ref={tagInputRef}
            placeholder="Add interests"
            onChangeText={(text) => setTagInput(text)}
            value={tagInput}
          />
          <TouchableOpacity onPress={handleAddTag}>
            <Text style={styles.addButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      {/* <View style={styles.viewContainer}>
        <View style={styles.searchContainer}>
         <Ionicons name="search" size={16} color="#454545" /> *
          <Text style={styles.searchText}>🔍 Our Story</Text>
          {!isEditing && (
            <TouchableOpacity onPress={handleEdit}>
              <FontAwesome6
                name="edit" // Right arrow icon
                size={16}
                color="#121212"
                style={styles.editIcon}
              />
            </TouchableOpacity>
          )}
        </View>

        {isEditing ? (
          <View>
            <TextInput
              style={styles.aboutInput}
              value={text}
              onChangeText={setText}
              multiline
              autoFocus
            />
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </View> */}
      {/* <View style={styles.viewContainer}>
        <View style={styles.searchContainer}>
           <Ionicons name="search" size={16} color="#454545" /> 
          <Text style={styles.searchText}>🔍 Basics</Text>
        </View>
        <View style={styles.basicContainer}>
          <View style={styles.columnContainer}>
            <View style={styles.rowContainer}>
              <MaterialIcons
                name="location-on"
                size={18}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>Location</Text>
            </View>
            <View style={styles.rowContainer2}>
              <Text style={styles.cell}>Pitampura</Text>
              <MaterialIcons
                name="keyboard-arrow-right" // Right arrow icon
                size={24}
                color="black"
              />
            </View>
          </View>
          <View style={styles.columnContainer1}>
            <View style={styles.rowContainer}>
              <FontAwesome5
                name="ruler-vertical"
                size={18}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell1}>Height</Text>
            </View>
            <View style={styles.rowContainer2}>
              <Text style={styles.cell}>155 cm</Text>
              <MaterialIcons
                name="keyboard-arrow-right" // Right arrow icon
                size={24}
                color="black"
              />
            </View>
          </View>
          <View style={styles.columnContainer}>
            <View style={styles.rowContainer}>
              <SimpleLineIcons
                name="graduation"
                size={18}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>Work</Text>
            </View>
            <View style={styles.rowContainer2}>
              <Text style={styles.cell}>PhD Student</Text>
              <MaterialIcons
                name="keyboard-arrow-right" // Right arrow icon
                size={24}
                color="black"
              />
            </View>
          </View>
          <View style={styles.columnContainer}>
            <View style={styles.rowContainer}>
              <AntDesign
                name="hearto"
                size={17}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>Sexuality</Text>
            </View>
            <View style={styles.rowContainer2}>
              <Text style={styles.cell}>Bisexual</Text>
              <MaterialIcons
                name="keyboard-arrow-right" // Right arrow icon
                size={24}
                color="black"
                style={styles.arrowIcon}
              />
            </View>
          </View>
        </View>
      </View> */}
      <View style={styles.viewContainer}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchText}>📸 Our Pictures</Text>
        </View>
        <View style={styles.pictureContainer}>{renderProfilePictures()}</View>
      </View>
      {/* <View style={styles.viewContainer}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchText}>😂 Our Humor Styles</Text>
          {!isDateNightEditing && (
            <TouchableOpacity onPress={handleDateNightEdit}>
              <FontAwesome6
                name="edit" // Right arrow icon
                size={16}
                color="#121212"
                style={styles.editIcon1}
              />
            </TouchableOpacity>
          )}
        </View>
        {isDateNightEditing ? (
          <View>
            <TextInput
              style={styles.aboutInput}
              value={dateNightText}
              onChangeText={setDateNightText}
              multiline
              autoFocus
            />
            <View style={styles.editView}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDateNightDone}
              >
                <Text style={styles.doneText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.doneButton}
                onPress={handleDateNightDone}
              >
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={styles.text}>{dateNightText}</Text>
        )}
      </View>
      <View style={styles.viewContainer}>
        <View style={styles.searchContainer}>
           <Ionicons name="search" size={16} color="#454545" /> 
          <Text style={styles.searchText}>🌟 Our Idea of a Fun Date</Text>
          {!talkEditing && (
            <TouchableOpacity onPress={handleTalkEdit}>
              <FontAwesome6
                name="edit" // Right arrow icon
                size={16}
                color="#121212"
                style={styles.editIcon2}
              />
            </TouchableOpacity>
          )}
        </View>
        {talkEditing ? (
          <View>
            <TextInput
              style={styles.aboutInput}
              value={talkText}
              onChangeText={setIsTalkText}
              multiline
              autoFocus
            />
            <View style={styles.editView}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleTalking}
              >
                <Text style={styles.doneText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.doneButton}
                onPress={handleTalking}
              >
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={styles.text}>{talkText}</Text>
        )}
      </View>
      <View style={styles.viewContainer}>
        <View style={styles.searchContainer}>
           <Ionicons name="search" size={16} color="#454545" /> 
          <Text style={styles.searchText}>🌟 I would like you if</Text>
          {!likeTextEditing && (
            <TouchableOpacity onPress={handlelikeEdit}>
              <FontAwesome6
                name="edit" // Right arrow icon
                size={16}
                color="#121212"
                style={styles.editIcon3}
              />
            </TouchableOpacity>
          )}
        </View>
        {likeTextEditing ? (
          <View>
            <TextInput
              style={styles.aboutInput}
              value={likeText}
              onChangeText={setIsLikeText}
              multiline
              autoFocus
            />
            <View style={styles.editView}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleLiking}
              >
                <Text style={styles.doneText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.doneButton}
                onPress={handleLiking}
              >
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={styles.text}>{likeText}</Text>
        )}
      </View> */}

      {profile.dynamicContent?.length > 0 ? (
        profile.dynamicContent.map((content, index) => (
          <View key={index} style={styles.viewContainer}>
            <View style={styles.searchContainer}>
              {/* <Ionicons name="star" size={16} color="#FFFF66" /> */}
              <Text style={styles.searchText}>{content.label}</Text>
              {!isEditing && (
                <TouchableOpacity
                  onPress={() => handleEdit(index, content.value)}
                >
                  <FontAwesome6
                    name="edit"
                    size={16}
                    color="#121212"
                    style={styles.editIcon}
                  />
                </TouchableOpacity>
              )}
            </View>
            {isEditing === index ? (
              <View>
                <TextInput
                  style={styles.aboutInput}
                  value={editText}
                  onChangeText={setEditText}
                  multiline
                  autoFocus
                />
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => handleDone(index, content._id)}
                >
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.text}>{content.value}</Text>
            )}
          </View>
        ))
      ) : (
        // Show activity indicator while loading
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading content...</Text>
        </View>
      )}

      {promptText && (
        <View style={styles.viewContainer}>
          <View style={styles.searchContainer}>
            {/* <Ionicons name="search" size={16} color="#454545" /> */}
            <Text style={styles.searchText}>{selectedPrompt}</Text>
            {!isPromptEditing && (
              <TouchableOpacity onPress={handlePromptEdit}>
                <FontAwesome6
                  name="edit" // Right arrow icon
                  size={16}
                  color="#121212"
                  style={styles.editIcon3}
                />
              </TouchableOpacity>
            )}
          </View>
          {isPromptEditing ? (
            <View>
              <TextInput
                style={styles.aboutInput}
                value={promptText}
                onChangeText={setPromptText}
                multiline
                autoFocus
              />
              <View style={styles.editView}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleLiking}
                >
                  <Text style={styles.doneText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={handleLiking}
                >
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text style={styles.text}>{promptText}</Text>
          )}
        </View>
      )}
      <View style={styles.promptContainer}>
        <TouchableOpacity onPress={() => setSelectedPrompt(prompts[0])}>
          <Text style={styles.searchText1}>💡 Add a prompt +</Text>
        </TouchableOpacity>
      </View>

      {selectedPrompt && (
        <View style={styles.selectedPromptContainer}>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={styles.selectedPrompt}
          >
            <Text style={styles.searchText2}>{selectedPrompt} ⏷</Text>
          </TouchableOpacity>
          {isDropdownVisible && (
            <View style={styles.dropdown}>
              {prompts
                .filter((prompt) => prompt !== selectedPrompt)
                .map((prompt) => (
                  <TouchableOpacity
                    key={prompt}
                    onPress={() => selectPrompt(prompt)}
                    style={styles.dropdownItem}
                  >
                    <Text style={styles.searchText2}>{prompt}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
          <TextInput
            style={styles.textInput1}
            placeholder={`Enter text for "${selectedPrompt}"`}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <View style={styles.editView}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handlePromptDone}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.singleBioContainer}>
        <Image source={profiles[0].singleImage1} style={styles.singleImage} />
        <View style={styles.bioDataContainer}>
          <View style={styles.singleNameContainer}>
            <Text style={styles.nameText1}>
              {profiles[currentProfileIndex].name1},
            </Text>
            <Text style={styles.ageText1}>
              {profiles[currentProfileIndex].age1}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="location-on"
                size={18}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>Pitampura</Text>
            </View>

            <View style={styles.iconContainer}>
              <SimpleLineIcons
                name="graduation"
                size={18}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>PhD Student</Text>
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.iconContainer3}>
              <FontAwesome5
                name="ruler-vertical"
                size={18}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>155 cm</Text>
            </View>
            <View style={styles.iconContainer}>
              <AntDesign
                name="hearto"
                size={17}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>Bisexual</Text>
            </View>
          </View>
          <Text style={styles.singleBioText}>
            "I bet I run faster than you."
          </Text>
        </View>
      </View>
      <View style={styles.singleBioContainer}>
        <Image source={profiles[0].singleImage2} style={styles.singleImage} />
        <View style={styles.bioDataContainer}>
          <View style={styles.singleNameContainer}>
            <Text style={styles.nameText1}>
              {profiles[currentProfileIndex].name2},
            </Text>
            <Text style={styles.ageText1}>
              {profiles[currentProfileIndex].age2}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="location-on"
                size={18}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>Pitampura</Text>
            </View>

            <View style={styles.iconContainer}>
              <SimpleLineIcons
                name="graduation"
                size={18}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>Analyst</Text>
            </View>
          </View>

          <View style={styles.rowContainer}>
            {/* <View style={styles.iconContainer3}>
                <FontAwesome5
                  name="ruler-vertical"
                  size={18}
                  color="#121212"
                  style={styles.locationIcon}
                />
                <Text style={styles.cell}>155 cm</Text>
              </View> */}
            <View style={styles.iconContainer}>
              <AntDesign
                name="hearto"
                size={17}
                color="#121212"
                style={styles.locationIcon}
              />
              <Text style={styles.cell}>Straight</Text>
            </View>
          </View>
          <Text style={styles.singleBioText}>
            "Joker with a punchline prowess."
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.doneButton1}
        onPress={navigateToInitialProfile}
      >
        <View style={[styles.buttonBackContainer]}>
          <Text style={styles.backButtonText}>Done</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    marginTop: 40,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headText: {
    fontWeight: "700",
    fontSize: 30,
    lineHeight: 35.94,
  },
  doneText1: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19.17,
  },
  donButton: {},
  image: {
    width: "92%",
    height: 600,
    alignSelf: "center",
    borderRadius: 12,
    marginRight: 3,
  },
  textContainer: {
    position: "absolute",
    top: 450,
    left: 7,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  nameText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EDEEF1",
    marginRight: 10,
  },
  ageText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#EDEEF1",
  },
  divider: {
    width: 3,
    height: 30,
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationIcon: {
    marginRight: 5,
    marginTop: 1,
    // width: 11,
    // height: 14,
  },
  locationText: {
    fontSize: 16,
    color: "#EDEEF1",
  },
  descriptionText: {
    fontSize: 14,
    color: "#EDEEF1",
    marginBottom: 20,
  },
  actionContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    top: 565,
    marginBottom: 20,
  },
  actionContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 8,
    // position: "absolute",
    // bottom: 10,
    // left: 0,
    // right: 0,
    marginTop: 40,
    marginBottom: 5,
  },
  actionButton1: { flex: 1, alignItems: "flex-end", marginHorizontal: 15 },
  actionButton2: { flex: 1, alignItems: "flex-start", marginHorizontal: 15 },
  heartButton: {
    borderRadius: 999,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 15,
  },
  searchText: {
    fontSize: 20,
    color: "black",
    //marginLeft: 0,
    fontWeight: "bold",
    lineHeight: 23.96,
    marginRight: 80,
  },
  searchText1: {
    fontSize: 20,
    color: "black",
    marginLeft: 20,
    fontWeight: "bold",
    lineHeight: 23.96,
    marginRight: 80,
  },
  searchText2: {
    fontSize: 20,
    color: "black",
    marginHorizontal: 10,
    fontWeight: "bold",
    lineHeight: 23.96,
  },
  editIcon: {
    marginLeft: "20%",
    marginBottom: 6,
  },
  editIcon1: {
    marginLeft: 35,
    marginBottom: 6,
  },
  editIcon2: {
    marginLeft: 6,
    marginBottom: 25,
  },
  editIcon3: {
    marginLeft: 24,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    lineHeight: 19.17,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  viewContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 6,
    paddingBottom: 10,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "#6420AA",
    borderRadius: 35,
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignItems: "center",
    width: 170,
    height: 49,
  },
  icon: {
    marginTop: 2,
    marginHorizontal: 7, // Adjust the spacing between icon and text as needed
  },
  doneButton1: {
    width: 340,
    height: 49,
    margin: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 35,
    // paddingVertical: 10,
    // paddingHorizontal: 10,

    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    border: 2,
    borderWidth: 2,
    borderColor: "#45474B",
  },
  // buttonBackContainer: {
  //   width: 345,
  //   height: 49,
  // },
  backButtonText: {
    width: 51,
    height: 24,
    color: "#121212",
    fontSize: 20,
    //alignSelf: "center",
    marginBottom: 4.5,
    lineHeight: 23.96,
    fontWeight: "400",
  },
  basicContainer: {
    width: 340,
    height: 200,
    flexDirection: "column",

    margin: 10,
    padding: 10,
  },
  // column: {
  //   flex: 1,
  //   alignItems: "flex-start",
  // },
  cell: {
    fontSize: 15, // Font size between 15 to 20
    marginBottom: 10,
  },
  columnContainer: {
    flex: 1,
    flexDirection: "row",
  },
  columnContainer1: {
    flex: 1,
    flexDirection: "row",

    marginLeft: 5,
  },
  cell1: {
    fontSize: 15, // Font size between 15 to 20
    marginBottom: 10,
    marginLeft: 3,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    //alignItems: "flex-end",
    //backgroundColor: "#ccc",
  },
  rowContainer2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    //backgroundColor: "green",
  },
  pictureContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    //justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 5,
  },
  pictureBox: {
    width: 94,
    height: 165,
    // backgroundColor: "lightgray",
    borderRadius: 5,
    margin: 5,
  },
  emptyBox: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1, // Add border width
    borderColor: "#121212",
  },
  plusIcon: {
    fontSize: 40,
    color: "black",
  },
  // tagsContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginTop: 10,
  // },
  // tagsInputContainer: {
  //   flex: 1,
  //   backgroundColor: "lightgray",
  //   borderRadius: 10,
  //   paddingHorizontal: 10,
  //   paddingVertical: 5,
  // },
  tagsInput: {
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
    marginBottom: -20,
    fontSize: 24,
    color: "#45474B",
  },
  renderedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
  },
  tag: {
    backgroundColor: "#E9E9E9",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    color: "#121212",
  },
  removeButton: {
    marginLeft: 5,
    color: "#121212",
  },
  textInput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    color: "#45474B",
    backgroundColor: "#EDEEF1",
    borderRadius: 22,
    width: 330,
    height: 40,
    alignSelf: "center",
  },
  textInput1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    color: "#121212",
    backgroundColor: "#EDEEF1",
    borderRadius: 4,
    width: 314,
    height: 54,
    alignSelf: "center",
  },
  aboutInput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingVertical: 7,
    paddingHorizontal: 8,
    color: "#121212",
    backgroundColor: "#EDEEF1",
    borderRadius: 7,
    width: 330,
    height: 72,
    alignSelf: "center",
    lineHeight: 19.12,
    fontSize: 16,
  },

  promptContainer: {
    width: 342,
    height: 60,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    margin: 21,
    //alignItems: "center",
    justifyContent: "center",
  },
  doneText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFDDEE",
  },
  doneButton: {
    width: 150,
    height: 40,
    backgroundColor: "#FF3156",
    borderRadius: 27,
    marginTop: 15,
    marginBottom: 7,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    width: 150,
    height: 40,
    backgroundColor: "#6420AA",
    borderRadius: 27,
    marginTop: 15,
    marginBottom: 7,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  editView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 17,
  },
  selectedPromptContainer: {
    width: "89%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  selectedPrompt: {
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    //alignItems: "center",
    marginBottom: 10,
  },
  dropdown: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: "#ccc",
    marginBottom: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#A799B2",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  renderedTextContainer: {
    marginTop: 20,
    width: "90%",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  renderedText: {
    fontSize: 16,
  },

  nameText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EDEEF1",
    marginRight: 10,
  },
  ageText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EDEEF1",
  },
  nameText1: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#121212",
    marginRight: 10,
    // lineHeight: 36.31,
  },
  ageText1: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#121212",
  },

  locationIcon: {
    marginRight: 3,
  },
  locationText: {
    fontSize: 16,
    color: "#EDEEF1",
  },
  descriptionText: {
    fontSize: 14,
    color: "#EDEEF1",
    marginBottom: 20,
  },

  actionButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: "#6420AA",
    borderRadius: 35,
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignItems: "center",
    width: 170,
    height: 49,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    //fontWeight: "bold",
    // marginTop: 5,
  },
  loadingContainer: {
    //flex: 1,
    height: 600,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: to add a semi-transparent background
    marginHorizontal: 20,
    borderRadius: 10,
  },

  loadingIndicator: {
    transform: [{ scale: 2 }], // Increase the size of the ActivityIndicator
  },
  // loadingContainer: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   backgroundColor: "rgba(255, 255, 255, 0.8)",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   zIndex: 1000, // Ensure it's above other content
  // },
  singleImage: {
    height: 110,
    width: 117,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 5,
  },
  singleBioContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginVertical: 10,
    marginHorizontal: 20,
    //   marginBottom: 10,
    borderRadius: 6,
    paddingBottom: 13,
  },
  singleNameContainer: {
    flex: 0.2,
    flexDirection: "row",
    // backgroundColor: "pink",
  },
  bioDataContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 4,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    //alignItems: "flex-end",
    //backgroundColor: "#ccc",
  },
  iconContainer: {
    flex: 0.8,
    flexDirection: "row",
    marginRight: 3,
    //  backgroundColor: "green",
  },
  iconContainer3: {
    flex: 0.8,
    flexDirection: "row",
    marginLeft: 4,
    marginRight: 3,
    //  backgroundColor: "green",
  },
  cell: {
    fontSize: 14, // Font size between 15 to 20
    marginBottom: 10,
    color: "#000000",
    marginRight: 2,
  },
  singleBioText: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 3,
    lineHeight: 16.77,
  },
  headerStyle: {
    marginTop: 40,
    position: "relative",
    left: 180,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#454545",
  },
});

export default TeamProfileDetails;
