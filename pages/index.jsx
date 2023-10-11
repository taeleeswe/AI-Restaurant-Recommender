import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { BiRestaurant } from "react-icons/bi";

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [restaurantInput, setRestaurantInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(e) {
    e.preventDefault();

    try {
      if (counter === 10) {
        return alert("you have reached your limit");
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ restaurant: restaurantInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setCounter(counter + 1);
      setRestaurantInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.body}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <BiRestaurant size={40} />
        <h3>Best Restaurant Today in NYC</h3>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="restaurant"
            value={restaurantInput}
            onChange={(e) => {
              setRestaurantInput(e.target.value);
              console.log(restaurantInput);
            }}
            placeholder="What do you want to eat today?"
          />
          <input type="submit" value="Generate restaurants" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
