import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icon

const Rating = ({ value }) => {

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (value >= i) {
        stars.push(<Icon key={i} name="star" style={styles.star} />);
      } else if (value >= i - 0.5) {
        stars.push(<Icon key={i} name="star-half-full" style={styles.star} />);
      } else {
        stars.push(<Icon key={i} name="star-o" style={styles.star} />);
      }
    }
    return stars;
  };

  return (
    <View style={styles.rating}>
      {renderStars()}
    </View>
  );
};

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
    marginTop: 20,
  },
  star: {
    color: "black",
    fontSize: 20,
    marginRight: 2,
  },
  ratingText: {
    marginLeft: 5,
  },
});

export default Rating;
