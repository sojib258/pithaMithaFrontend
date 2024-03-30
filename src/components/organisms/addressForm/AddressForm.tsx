"use client";
import Button from "@/components/atoms/button/Button";
import SelectBox from "@/components/atoms/selectBox/Select";
import TagButton from "@/components/atoms/tagButton/TagButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./addressForm.module.scss";

interface AddressFormProps {
  onCreate: () => void;
}

type Areas = {
  [key: string]: string[];
};

type formFields = {
  name: string;
  number: number;
  division: string;
  city: string;
  area: string;
  address: string;
  landmark: string;
  deliveryOption: string;
};

const AddressForm: React.FC<AddressFormProps> = ({ onCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<formFields>();

  const handleAddressData: SubmitHandler<formFields> = (data: object) => {
    console.log("Da", data);
    // onCreate();
  };

  console.log("Errors", errors);

  const divisions = [
    {
      name: "Barishal",
      cities: [
        "Barguna",
        "Barisal-Agailjhara",
        "Barisal-Babuganj",
        "Barisal-Bakerganj",
        "Barisal-Gouranadi",
        "Barisal-Hizla",
        "Barisal-Mehendiganj",
        "Barisal-Muladi",
        "Barisal-Town",
        "Barisal-Uzipur",
        "Bhola",
        "Jhalokati",
        "Patuakhali",
        "Pirojpur",
      ],
    },
    {
      name: "Chattogram",
      cities: [
        "Bandarban",
        "Brahmanbaria",
        "Brahmanbaria-Kasba",
        "Brahmanbaria-Nabinagar",
        "Brahmanbaria-Sarail",
        "Chandpur-Faridganj",
        "Chandpur-Hajiganj",
        "Chandpur-Hayemchar",
        "Chandpur-Kachua",
        "Chandpur-Matlab",
        "Chandpur Sadar",
        "Chandpur-Shahrasti",
        "Chattogram-Boalkhali",
        "Chattogram-Anowara",
        "Chattogram-Banshkhali",
        "Chattogram-Chandanaish",
        "Chattogram-Fatikchhari",
        "Chattogram-Hathazari",
        "Chattogram-Lohagara",
        "Chattogram-Mirsharai",
        "Chattogram-Patiya",
        "Chattogram-Rangunia",
        "Chattogram-Raozan",
        "Chattogram Sadar",
        "Chattogram-Sandwip",
        "Chattogram-Satkania",
        "Chattogram-Sitakunda",
        "Comilla-Barura",
        "Comilla-Brahmanpara",
        "Comilla-Burichang",
        "Comilla-Chandina",
        "Comilla-Choddagram",
        "Comilla-Daudkhandi",
        "Comilla-Davidhar",
        "Comilla-Homna",
        "Comilla-Laksam",
        "Comilla-Lalmai",
        "Comilla-Langalkot",
        "Comilla-Meghna",
        "Comilla-Monohorganj",
        "Comilla-Muradnagar",
        "Comilla Sadar",
        "Cox's Bazar-Chakaria",
        "Cox's Bazar-Eidgaon",
        "Cox's Bazar-Kutubdia",
        "Cox's Bazar-Moheskhali",
        "Cox's Bazar-Ramu",
        "Cox's Bazar Sadar",
        "Cox's Bazar-Teknaf",
        "Cox's Bazar-Ukhia",
        "Feni-Chhagalnaia",
        "Feni-Daganbhuiyan",
        "Feni-Pashurampur",
        "Feni Sadar",
        "Feni-Sonagazi",
        "Hatiya",
        "Khagrachhari-Dighinala",
        "Khagrachhari-Laxmichhari",
        "Khagrachhari-ManikChhari",
        "Khagrachhari-Matiranga",
        "Khagrachhari-Panchhari",
        "Khagrachhari-Ramghar",
        "Lakshmipur",
        "Lakshmipur-Raipur",
        "Lakshmipur-Ramganj",
        "Lakshmipur-Ramgati",
        "Lakshmipur-Raypur",
        "Noakhali",
        "Noakhali-Basurhat",
        "Noakhali-Begumganj",
        "Noakhali-Chatkhil",
        "Noakhali-Senbag",
        "Rangamati Barkal",
        "Rangamati-Bilaichhari",
        "Rangamati-Juraichhari",
        "Rangamati-Kaptai",
        "Rangamati-Kawkhali",
        "Rangamati-Langadu",
        "Rangamati Marishya",
        "Rangamati-Naniachhar",
        "Rangamati-Rajsthali",
        "Rangamati Town",
      ],
    },
    {
      name: "Dhaka",
      cities: [
        "Dhaka-North",
        "Dhaka-South",
        "Faridpur",
        "Gazipur",
        "Gopalganj",
        "Keraniganj-Dhaka",
        "Kishoreganj",
        "Madaripur",
        "Manikganj-Shibloya",
        "Manikganj-Singair",
        "Manikganj-Town",
        "Munshiganj-Gajaria",
        "Munshiganj-Lohajong",
        "Munshiganj-Sirajdhikhan",
        "Munshiganj-Town",
        "Narayanganj",
        "Narsingdi",
        "Nawabganj",
        "Rajbari-Baliakandi",
        "Rajbari-Pangsha",
        "Rajbari-Town",
        "Savar",
        "Shariatpur-Naria",
        "Shariatpur-Town",
        "Tangail-Basail",
        "Tangail-Bhuapur",
        "Tangail-Deldur",
        "Tangail-Dhanbari",
        "Tangail-Ghatail",
        "Tangail-Gopalpur",
        "Tangail-Kalihati",
        "Tangail-Madhupur",
        "Tangail-Mirzapur",
        "Tangail-Nagarpur",
        "Tangail-Sakhipur",
        "Tongi",
      ],
    },
    {
      name: "Khulna",
      cities: [
        "Bagerhat",
        "Chuadanga",
        "Jessore",
        "Jhenaidaha",
        "Khulna-Aliapur",
        "Khulna-Amadee",
        "Khulna-Batiaghat",
        "Khulna-Chalna Bazar",
        "Khulna-Digalia",
        "Khulna-Dumuria",
        "Khulna-Paikgachha",
        "Khulna-Terokhada",
        "Khulna-Town",
        "Kushtia",
        "Magura",
        "Meherpur",
        "Narail",
        "Satkhira",
      ],
    },
    {
      name: "Mymensingh",
      cities: [
        "Jamalpur-Dewangonj",
        "Jamalpur-Islampur",
        "Jamalpur-Madarganj",
        "Jamalpur-Malandah",
        "Jamalpur-Shorishbari",
        "Jamalpur-Town",
        "Mymensingh-Gaforgaon",
        "Mymensingh-Gouripur",
        "Mymensingh-Haluaghat",
        "Mymensingh-Isshwargonj",
        "Mymensingh-Muktagacha",
        "Mymensingh-Nandail",
        "Mymensingh-Phulpur",
        "Mymensingh-Town",
        "Mymensingh-Trishal",
        "Netrokona",
        "Sherpur",
      ],
    },
    {
      name: "Rajshahi",
      cities: [
        "Bogura",
        "Chapai Nawabganj",
        "Joypurhat",
        "Naogaon",
        "Natore",
        "Pabna",
        "Rajshahi",
        "Sirajganj",
      ],
    },
    {
      name: "Rangpur",
      cities: [
        "Dinajpur",
        "Gaibandha",
        "Kurigram",
        "Lalmonirhat",
        "Nilphamari",
        "Nilphamari-Saidpur",
        "Panchagarh",
        "Rangpur",
        "Thakurgaon",
      ],
    },
    {
      name: "Sylhet",
      cities: [
        "Habiganj",
        "Maulvi Bazar",
        "Sunamganj",
        "Sylhet-Balaganj",
        "Sylhet-Bianibazar",
        "Sylhet-Bishwanath",
        "Sylhet-Fenchuganj",
        "Sylhet-Goainhat",
        "Sylhet-Gopalganj",
        "Sylhet-Jakiganj",
        "Sylhet-Kanaighat",
        "Sylhet Sadar",
      ],
    },
  ];

  const areas: Areas = {
    Barguna: [
      "Barguna-Amtoli",
      "Barguna-Bamna",
      "Barguna Government College",
      "Barguna Sadar",
      "Barguna Taltali",
      "Barguna West Police Farry",
      "Betagi",
      "Darul Ulum",
      "Kakchira",
      "Nali Bandar",
      "Patharghata",
    ],
    "Barisal-Agailjhara": [
      "Agailjhara Bazar",
      "Agailjhara Sadar",
      "Gaila",
      "Paisarhat",
    ],
    "Barisal-Babuganj": [
      "Babuganj Sadar",
      "Barishal Cadet College",
      "Chandpasha",
      "Dehergoti",
      "Guthia",
      "Madhabpasha",
      "Nizamuddin College",
      "Rahamatpur",
      "Thakur Mallik",
    ],
    "Barisal-Bakerganj": [
      "Bakerganj Darial",
      "Charamandi",
      "Garuria",
      "Kalaskati",
      "Padri Shibpur",
      "Sahebganj",
    ],
    "Barisal-Gouranadi": [
      "Batajor",
      "Gouranadi Launch Ghat",
      "Gouranadi Sadar",
      "Kashemabad",
      "Mridha Market",
      "Tarki Bandar",
    ],
    "Barisal-Hizla": ["Barajalia Sadar", "Memania", "Osman Manjil"],
    "Barisal-Mehendiganj": [
      "Langutia",
      "Laskarpur",
      "Mehendiganj Sadar",
      "Ulania",
    ],
    "Barisal-Muladi": [
      "Bara Madhab rayer char",
      "Charkalekhan",
      "Kazirchar",
      "Muladi Sadar",
    ],
    "Barisal-Town": [
      "Barishal Kazipara",
      "Barishal Sadar",
      "Bibir Pukur",
      "Bukhainagar",
      "Chahutpur",
      "Jaguarhat",
      "Kashipur",
      "Kawnia",
      "Moth Baria",
    ],
    "Barisal-Uzipur": [
      "Dakuarhat",
      "Dhamura",
      "Jugirkanda",
      "Shikarpur",
      "Uzipur Bazar",
      "Uzipur Sadar",
      "Wazirpur Bazar",
    ],
    Bhola: [
      "Abhohawa Office Road",
      "Ali Nagar",
      "Bangla School Mor",
      "Bankar Hat",
      "Bhola Bapta",
      "Bhola Boys School Road",
      "Bhola Central Post Office",
      "Bhola Collage Road",
      "Bhola Girls Collage Road",
      "Bhola Notun Bazar",
      "Bhola Sadar",
      "Bhola Sadar Hospital Road",
      "Bhola UKil Para",
      "Borhanuddinn UPO",
      "Charfashion",
      "Char Kalmi",
      "Chornoyabad",
      "Chorshami",
      "Daurihat",
      "Dorga Road",
      "Doulatkhan",
      "Dularhat",
      "Gazaria",
      "Hajipur",
      "Hajirhat",
      "Hatshoshiganj",
      "Jamiralota",
      "Joynagar",
      "Kalibari Road",
      "Kalikhola Road",
      "Keramatganj",
      "Lalmohan UPO",
      "Mirzakalu",
      "Monpura",
      "Mostofa Kamal Bus Stand",
      "Nasir Mazi",
      "New Elisha Bus Stand",
      "Nobi Pur",
      "Old Elisha Bus Stand",
      "P.T.I Road",
      "Pouro Khathali",
      "Roton Pur",
      "Sodurchar",
      "Tazumuddin",
      "Western Para",
    ],
    Jhalokati: [
      "Alam Market",
      "Amtola Bazar",
      "Amua",
      "Amua Bazar",
      "Amua Zero Point",
      "Aorabunia Dokkhinpar Bazar",
      "Bablatola Bazar",
      "Baidarapur",
      "Banai Bazar",
      "Bashonda",
      "Baukathi",
      "Beerkathi",
      "Bhairabpasha",
      "Bhavanipur Launch Station",
      "Binapani Bazar",
      "Binoy Khathi",
      "Bisic Silponogori Jhalokhati",
      "Bot Tola Bazar",
      "C&B Bazar",
      "Centrer Hat",
      "Charukhan",
      "Dapdapia Launch Ghat",
      "Darul Habib Khanka Sharif Dapdapia Barishal",
      "Deulkati",
      "Dopdipia Fish Bazar",
      "Fokir Market",
      "Gabha",
      "Gabkhan",
      "Galua Bazar",
      "Gopalpur Pochchim Para",
      "Guachitra Bazar",
      "Guhuder Bazar",
      "Hodua Bazar",
      "Hodua Launch Terminal",
      "Islamia Bazar",
      "Jhalokati Sadar",
      "Kachua Ferry Terminal",
      "Kathalia",
      "Khejurtala Bazar",
      "Kirtipasha",
      "Kalokopa Bazar",
      "Kulkhathi Bazar",
      "Magar Bazar",
      "Mahtab Malta Bagan",
      "Manpasha",
      "Mohajon Bazar",
      "Mollar Hatt Bazar",
      "Morichbunia Bazar",
      "Mothbari",
      "Munsirabad Bazar Jhalokathi Shouljalia",
      "Nabagram",
      "Nalchhiti",
      "Nathullabadh",
      "Notun Hath Bazar Jhalokathi Ranapasha",
      "Noyarasta Bazar",
      "Panchagram Bazar",
      "Pingri",
      "Ponabalia Bazar",
      "Protap",
      "Rajapur",
      "Rajapur Jhalokatii",
      "Satani Bazar",
      "Shakherhat",
      "Shameer Hat",
      "Shekherhat",
      "Shoulajalia",
      "South Palot Launch Terminal",
      "Taltola Bazar",
      "Tekerhat Bazar",
      "Ukel Bazar",
      "Uttar Bikna",
      "Zahatola Bazar",
    ],
    Patuakhali: [
      "Auliapur",
      "Bagabandar",
      "Barabighai",
      "Bauphal",
      "Birpasha",
      "Char Montaz",
      "Dashmina",
      "Dumkee",
      "Galachipa",
      "Gazipur Bandar",
      "Hetalia Badhghat",
      "Jainkathi",
      "Kalaia",
      "Kalapara-Galachipa",
      "Kalishari",
      "Katpotti",
      "Khepupara",
      "Kuakata",
      "Lebukhali",
      "Lohalia",
      "Mahipur",
      "Marichbunia",
      "Mirjaganj Sarak",
      "Mitha Pukur Par",
      "Moukaran",
      "Mukul Cinema Hall",
      "Nobab Para",
      "Patuakhali Banani",
      "Patuakhali Jailkhana Road",
      "Patuakhali Medical College Hospital",
      "Patuakhali Notun Bazar",
      "Patuakhali Pourosova",
      "Patuakhali Puran Bazar",
      "Patuakhali Sadar",
      "Patuakhali Shilpokola Academy",
      "Rangabali",
      "Subidkhali",
    ],
    Pirojpur: [
      "Amla Para",
      "Banaripara",
      "Betmor Natun Hat",
      "Bhandaria",
      "Bolaka Club Road",
      "Bolassor Bridge",
      "Boro Mosjid",
      "C.I Para",
      "Chakhar",
      "Damudar Bridge",
      "Darus Sunnat",
      "Dhaoa",
      "Dokhin Shikar Pur",
      "Dopa Bara",
      "Duppasa",
      "Gulishakhali",
      "Hularhat",
      "Jalabari",
      "Jolagati",
      "Joykul",
      "Kanudashkathi",
      "Kaukhali",
      "Kaurikhara",
      "Keundia",
      "Masim Pur",
      "Matani Road",
      "Mathbaria",
      "Mohila College Road",
      "Muchi Para",
      "Nazirpur",
      "Nirer Goli",
      "Parerhat",
      "Pirojpur Adarsha Para",
      "Pirojpur Boropul",
      "Pirojpur Bot Tola",
      "Pirojpur College Road",
      "Pirojpur DC Office",
      "Pirojpur Judge Court",
      "Pirojpur Lged",
      "Pirojpur New Bus Stand",
      "Pirojpur P.T.I Road",
      "Pirojpur Palpara",
      "Pirojpur Police Line",
      "Pirojpur Police Station",
      "Pirojpur Post Office",
      "Pirojpur Pouro Shoshan",
      "Pirojpur Puran Pouroshova Road",
      "Pirojpur Sadar",
      "Pirojpur Sadar Hospital",
      "Pirojpur Sadar Thana",
      "Pirojpur Surgicare",
      "Pirojpur Town Club",
      "Pirojpur Ukil Para",
      "Rajar Hat",
      "Sheikh Para",
      "Shikha Office",
      "Shilarganj",
      "Sriramkathi",
      "Tiarkhali",
      "Tushkhali",
      "Yasinkhar Pol",
    ],
    Bandarban: [
      "Bandarban-Alikadam",
      "Bandarban-Balaghata",
      "Bandarban Sadar",
      "Naikhong",
      "Naikhongchari",
      "Roanchhari",
      "Ruma",
      "Thanchi",
      "Thanchi Lama",
    ],
    Brahmanbaria: [
      "Akhaura",
      "Akhaura Gangasagar",
      "Banchharampur",
      "Bijoynagar",
      "Bijoynagar-Harashpur",
      "Brahmanbaria Sadar",
      "Brahmanbaria Sadar Ashuganj",
      "Brahmanbaria Sadar Ashuganj Share",
      "Brahmanbaria Sadar-Bhadughar",
      "Brahmanbaria Sadar-Gokarna Ghat",
      "Brahmanbaria Sadar-Natai",
      "Brahmanbaria Sadar Poun",
      "Brahmanbaria Sadar Talshahar",
      "Nabinagar-Hujur Bari",
      "Nasirnagar",
      "Suhilpur",
    ],
  };

  // Watch mode mendatory for live changing of some form values
  const [divisionValue, cityValue] = watch([
    "division",
    "city",
    "area",
    "deliveryOption",
  ]);

  useEffect(() => {
    setValue("division", divisionValue);
    setValue("city", ""); // Reset city value when division changes
    setValue("area", ""); // Reset area value when division changes
  }, [divisionValue, setValue]);

  useEffect(() => {
    setValue("area", ""); // Reset area value when division changes
  }, [cityValue, setValue]);

  const handleTagButton = (value: string) => {
    setValue("deliveryOption", value);
  };

  return (
    <Box className={styles.address}>
      <Grid container mb={4}>
        <Grid item xs={12} md={6}>
          <Box className={styles.address__leftItem}>
            <Box className={styles.address__inputItem}>
              <label className={styles.address__inputLabel} htmlFor="name">
                Full Name *
              </label>
              <input
                id={"name"}
                type="text"
                placeholder="Input full name"
                className={styles.address__input}
                {...register("name", { required: "Your name is required" })}
              />
              {errors.name && (
                <Typography
                  component={"span"}
                  className={styles.address__errorMsg}
                >
                  {errors.name.message}
                </Typography>
              )}
            </Box>

            <Box className={styles.address__inputItem}>
              <label className={styles.address__inputLabel} htmlFor="number">
                Mobile Number *
              </label>
              <input
                id={"number"}
                type="number"
                placeholder="Input mobile number"
                className={styles.address__input}
                {...register("number", {
                  required: "Please provide a valid phone number",
                  minLength: {
                    value: 11,
                    message: "Phone number must be at least 11 digits long",
                  },
                })}
              />
              {errors.number && (
                <Typography
                  component={"span"}
                  className={styles.address__errorMsg}
                >
                  {errors.number.message}
                </Typography>
              )}
            </Box>

            <Box className={styles.address__inputItem}>
              <label
                style={{ marginBottom: "8px" }}
                className={styles.address__inputLabel}
                htmlFor="division"
              >
                Division *
              </label>
              <SelectBox
                value={getValues("division")}
                options={divisions.map((division) => division.name)}
                label="Please choose your division"
                register={register("division", {
                  required: "Please provide your division",
                })}
                sx={{ width: "100%!important" }}
              />
              {errors.division && (
                <Typography
                  component={"span"}
                  className={styles.address__errorMsg}
                >
                  {errors.division.message}
                </Typography>
              )}
            </Box>

            <Box className={styles.address__inputItem}>
              <label
                style={{ marginBottom: "8px" }}
                className={styles.address__inputLabel}
                htmlFor="city"
              >
                City *
              </label>
              <SelectBox
                value={getValues("city")}
                options={
                  divisionValue
                    ? divisions.find(
                        (division) => division.name === divisionValue
                      )?.cities || []
                    : []
                }
                label="Please choose your city"
                register={register("city", {
                  required: "Please provide your city",
                })}
                sx={{ width: "100%!important" }}
                disabled={!divisionValue}
              />
              {errors.city && (
                <Typography
                  component={"span"}
                  className={styles.address__errorMsg}
                >
                  {errors.city.message}
                </Typography>
              )}
            </Box>

            <Box className={styles.address__inputItem}>
              <label
                style={{ marginBottom: "8px" }}
                className={styles.address__inputLabel}
                htmlFor="area"
              >
                Area *
              </label>
              <SelectBox
                value={getValues("area")}
                options={cityValue ? areas[cityValue] || [] : []}
                label="Please choose your area"
                register={register("area", {
                  required: "Please provide your area",
                })}
                sx={{ width: "100%!important" }}
                disabled={!cityValue}
              />
              {errors.area && (
                <Typography
                  component={"span"}
                  className={styles.address__errorMsg}
                >
                  {errors.area.message}
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={styles.address__rightItem}>
            {/* Address Field */}
            <Box className={styles.address__inputItem}>
              <label className={styles.address__inputLabel} htmlFor="address">
                Address *
              </label>
              <input
                id={"address"}
                type="text"
                placeholder="House no. / building / street / area"
                className={styles.address__input}
                {...register("address", { required: "Provide your address" })}
              />
              {errors.address && (
                <Typography
                  component={"span"}
                  className={styles.address__errorMsg}
                >
                  {errors.address.message}
                </Typography>
              )}
            </Box>

            {/* LandMark Field */}
            <Box className={styles.address__inputItem}>
              <label className={styles.address__inputLabel} htmlFor="landmark">
                Landmark {"(Optional)"}
              </label>
              <input
                id={"landmark"}
                type="text"
                placeholder="E.g. beside train station"
                className={styles.address__input}
                {...register("landmark")}
              />
            </Box>

            {/* Delivery option */}
            <Box className={styles.address__inputItem}>
              <label
                className={styles.address__inputLabel}
                htmlFor="deliveryOption"
                style={{ marginBottom: "8px" }}
              >
                Select a label for effective delivery:
              </label>
              <Box>
                <TagButton
                  onClick={() => handleTagButton("home")}
                  label="Home"
                  register={register("deliveryOption")}
                  sx={{
                    padding: "10px 30px!important",
                    borderRadius: "4px!important",
                    marginRight: "15px",
                    border:
                      getValues("deliveryOption") === "home"
                        ? "2px solid #00b207"
                        : "none",
                    "&:hover": {
                      backgroundColor: "#e6e6e6!important",
                      color: "#1a1a1a!important",
                    },
                  }}
                />
                <TagButton
                  onClick={() => handleTagButton("office")}
                  label="Office"
                  register={register("deliveryOption")}
                  sx={{
                    padding: "10px 30px!important",
                    borderRadius: "4px!important",
                    border:
                      getValues("deliveryOption") === "office"
                        ? "2px solid #00b207"
                        : "none",
                    "&:hover": {
                      backgroundColor: "#e6e6e6!important",
                      color: "#1a1a1a!important",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* <Box width={"300px"} ml={"auto"} bgcolor={"red"}> */}
      <Button
        text="Save"
        sx={{
          padding: "8px 60px!important",
          marginLeft: "auto",
          display: "flex",
          borderRadius: "8px!important",
        }}
        onClick={handleSubmit(handleAddressData)}
      />
      {/* </Box> */}
    </Box>
  );
};

export default AddressForm;
