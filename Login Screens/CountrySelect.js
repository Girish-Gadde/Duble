import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";

const CountryCodeSelector = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryList = data
          .filter((country) => country.idd?.root && country.idd?.suffixes)
          .map((country) => ({
            label: `${country.name.common} (${country.idd.root}${country.idd.suffixes[0]})`,
            value: `${country.idd.root}${country.idd.suffixes[0]}`,
          }));
        setCountries(countryList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleNext = () => {
    if (selectedCountry) {
      navigation.navigate("PhoneLogin", { countryCode: selectedCountry });
    } else {
      alert("Please select a country.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContainer}>
        <Text style={styles.heading}>Select a Country Code</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading countries...</Text>
          </View>
        ) : (
          <DropDownPicker
            open={dropdownOpen}
            value={selectedCountry}
            items={countries}
            setOpen={setDropdownOpen}
            setValue={setSelectedCountry}
            searchable={true} // Enables search bar inside dropdown
            searchPlaceholder="Search for a country"
            placeholder="Select a country"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownList}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleNext} disabled={loading}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop:'50%'
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  centeredContainer: {
    width: "90%",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dropdown: {
    width: "100%",
    marginBottom: 20,
  },
  dropdownList: {
    width: "100%",
  },
  selectedCountry: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: "italic",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "2%",
  },
  button: {
    width: 356,
    height: 49,
    backgroundColor: "#6420AA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
});

export default CountryCodeSelector;
