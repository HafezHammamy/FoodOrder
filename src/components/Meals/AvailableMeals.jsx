import React, { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "./../UI/Card";
import MealItem from "./MealItem/MealItem";
import axios from "axios";
import Loader from "react-loader-spinner";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        setError(null);
        setLoading(true);

        const { data } = await axios.get(
          "https://foodorderapp-6811b-default-rtdb.firebaseio.com/meals.json"
        );

        setMeals(data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.status);
        if (error.response.status === 404) {
          setError("something went wrong!");
        }
      }
    }
    getData();
  }, [setMeals, setLoading]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {error && <p className={classes.alert}>{error}</p>}
        {loading && (
          <center>
            <Loader
              type="Puff"
              color="#00BFFF"
              height={50}
              width={50}
              timeout={3000} //3 secs
            />
          </center>
        )}
        {!loading && !error && <ul>{mealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
