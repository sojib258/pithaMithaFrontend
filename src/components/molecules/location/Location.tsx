import InputText from "@/components/atoms/inputText/InputText";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import styles from "./location.module.scss";

interface LocationProps {
  handleLocationSelect: (location: string) => void;
  handleClose?: () => void;
}

const Location: React.FC<LocationProps> = ({
  handleLocationSelect,
  handleClose,
}) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const cities: { [key: string]: string[] } = {
    Dhaka: [
      "Dhaka",
      "Mirpur",
      "Uttara",
      "Mohammadpur",
      "Savar",
      "Jatrabari",
      "Basabo",
      "Aftab nagar",
      "Badda",
      "Banani",
      "Banasree",
      "Banglamotor",
      "Bangshal",
      "Baridhara",
      "Bashundhara City",
      "Basundhara",
      "Bosila",
      "Cantonment",
      "Chaukbazar",
      "Demra",
      "Dhamrai",
      "Dhanmondi",
      "Dohar",
      "ECB Chattar",
      "Elephant Road",
      "Eskaton",
      "Farmgate",
      "Gulshan",
      "Hazaribagh",
      "Jalshiri Abason",
      "Jamuna Future Park",
      "Kafrul",
      "Kamrangirchar",
      "Keraniganj",
      "Khilgaon",
      "Khilkhet",
      "Kotwali",
      "Lalbag",
      "Lalmatia",
      "Malibag",
      "Mawa Highway",
      "Mogbazar",
      "Mohakhali",
      "Motalib Plaza",
      "Motijheel",
      "Multiplan Center",
      "Nawabganj",
      "New Market",
      "Paltan",
      "Purbachal",
      "Ramna",
      "Rampura",
      "Shantinagar",
      "Shewrapara",
      "Shyamoli",
      "Sutrapur",
      "Tejgaon",
      "Tongi",
      "Wari",
    ],
    Chattogram: [
      "Chattogram",
      "Agrabad",
      "Alankar",
      "Anderkilla",
      "Baizid",
      "Bakoliya",
      "Bandar",
      "Boalkhali",
      "Chawkbazar",
      "Kotwali",
      "Nasirabad",
      "Halishahar",
    ],
    Sylhet: [
      "Sylhet",
      "Akhalia",
      "Bagh Bari(Baghbari)",
      "Balaganj",
      "Bateshwar",
      "Beanibazar",
      "Bishwanath",
      "Chouhatta",
      "Companiganj",
      "Dargah Mahalla",
      "Fenchuganj",
      "Golapganj",
    ],
    Khulna: [
      "Khulna",
      "Batighata",
      "Dacope",
      "Dakbangla",
      "Dighalia",
      "Dumuria",
      "Gollamari",
      "Horintana Thana",
      "Keshabpur",
    ],
    Barishal: [
      "Barishal",
      "Amtala",
      "Bakerganj",
      "Banglabazar",
      "Beltola Feri Ghat",
      "Chand Mari",
    ],
    Rajshahi: [
      "Rajshahi",
      "Bagmara",
      "Baharampur",
      "Boalia",
      "Bosepara",
      "Chhota Banagram",
    ],
    Rangpur: [
      "Rangpur",
      "Alamdangha",
      "Bodorganj",
      "College Para",
      "GL Roy Road",
      "Gangachara",
      "Kachari Bazaar",
    ],
    Mymensingh: [
      "Mymensingh",
      "Cantonment",
      "Ishwarganj",
      "Kewatkhali",
      "Kistopur",
      "Naumahal",
      "Phulpur",
    ],
  };

  const divisions: { [key: string]: string[] } = {
    "Dhaka Division": [
      "All of Dhaka Division",
      "Narayanganj",
      "Gazipur",
      "Manikgonj",
      "Munshigonj",
      "Narsingdi",
      "Tangail",
      "Kishorgonj",
      "Netrokona",
      "Faridpur",
      "Gopalgonj",
      "Madaripur",
      "Rajbari",
      "Shariatpur",
    ],
    "Chattogram Division": [
      "All of Chattogram Division",
      "Brahmanbaria",
      "Chandpur",
      "Comilla",
      "Cox's Bazar",
      "Feni",
      "Hatiya",
      "Khagrachhari",
      "Lakshmipur",
      "Noakhali",
      "Rangamati",
    ],
    "Sylhet Division": [
      "All of Sylhet Division",
      "Habiganj",
      "Maulvi Bazar",
      "Sunamganj",
      "Sreemangal",
      "Borolekha",
    ],
    "Khulna Division": [
      "All of Khulna Division",
      "Kustia",
      "Jashore",
      "Jhenaidah",
      "Satkhira",
      "Bagerhat",
      "Chuadanga",
      "Magura",
      "Meherpur",
      "Narail",
    ],
    "Rajshahi Division": [
      "All of Rajshahi Division",
      "Pabna",
      "Bogura",
      "Sirajganj",
      "Natore",
      "Naogaon",
      "Chapainawabganj",
      "Joypurhat",
    ],
    "Rangpur Division": [
      "All of Rangpur Division",
      "Dinajpur",
      "Gaibandha",
      "Kurigram",
      "Saidpur",
      "Lalmonirhat",
    ],
    "Barishal Division": [
      "All of Barishal Division",
      "Patuakhali",
      "Bhola",
      "Pirojpur",
      "Barguna",
      "Jhalokati",
    ],
    "Mymensingh Division": [
      "All of Mymensingh Division",
      "Jamalpur",
      "Sherpur",
      "Netrokona",
    ],
    // Add other divisions and their cities here...
  };

  const handleCitySelect = (city: string) => {
    if (cities[city]) {
      setSelectedCity(city);
    }
    setSelectedDivision(null);
  };

  const handleDivisionSelect = (division: string) => {
    setSelectedDivision(division);
    setSelectedCity(null);
  };
  const filteredCities = selectedCity
    ? cities[selectedCity].filter((area) =>
        area.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const filteredDivisions = selectedDivision
    ? divisions[selectedDivision].filter((city) =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSelectLocation = (location: string) => {
    handleLocationSelect(location);
    if (handleClose) {
      handleClose();
    }
  };

  console.log("selectedCity", selectedCity);
  console.log("selectedDivision", selectedDivision);
  console.log("searchTerm", searchTerm);

  return (
    <Box className={styles.location}>
      {selectedCity ? (
        <>
          <InputText
            sx={{ marginTop: "20px" }}
            label="Search Area"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <List className={styles.location__list}>
            {filteredCities.map((area) => (
              <ListItem
                className={styles.location__listItem}
                key={area}
                onClick={() => handleSelectLocation(area)}
              >
                <ListItemText
                  className={styles.location__listItemText}
                  primary={area}
                />
              </ListItem>
            ))}
          </List>
        </>
      ) : selectedDivision ? (
        <>
          <InputText
            sx={{ marginTop: "20px" }}
            label="Search City"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <List className={styles.location__list}>
            {filteredDivisions.map((city) => (
              <ListItem
                className={styles.location__listItem}
                key={city}
                onClick={() => handleSelectLocation(city)}
              >
                <ListItemText
                  className={styles.location__listItemText}
                  primary={city}
                />
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <>
          <List className={styles.location__list}>
            <ListItem className={styles.location__listItemDefault}>
              <ListItemText
                className={styles.location__listItemDefaultText}
                primary="Cities"
              />
            </ListItem>
            {Object.keys(cities).map((city) => (
              <ListItem
                className={styles.location__listItem}
                key={city}
                onClick={() => handleCitySelect(city)}
              >
                <ListItemText
                  className={styles.location__listItemText}
                  primary={city}
                />
              </ListItem>
            ))}
            <ListItem className={styles.location__listItemDefault}>
              <ListItemText
                className={styles.location__listItemDefaultText}
                primary="Divisions"
              />
            </ListItem>
            {Object.keys(divisions).map((division) => (
              <ListItem
                className={styles.location__listItem}
                key={division}
                onClick={() => handleDivisionSelect(division)}
              >
                <ListItemText
                  className={styles.location__listItemText}
                  primary={division}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default Location;
