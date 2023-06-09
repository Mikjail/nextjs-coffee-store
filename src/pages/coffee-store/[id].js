import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";
import styles from "../../styles/coffee-store.module.css";
import {getCoffeeShops} from "../../lib/coffee-store";
import {useContext, useEffect, useState} from "react";

import {isEmpty} from "../../utils";
import {StoreContext} from "../../store/store.context";

export async function getStaticProps(staticProps) {
  const coffeeStores = await getCoffeeShops();
  const {params} = staticProps;
  const findCoffeeShopById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; //dynamic id
  });
  return {
    props: {
      coffeeStore: findCoffeeShopById || {}
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await getCoffeeShops();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  const id = router.query.id;
  const [coffeeShop, setCoffeeShop] = useState(initialProps.coffeeStore);
  const {state} = useContext(StoreContext);

  useEffect(() => {
    console.log(state);
    if (isEmpty(coffeeShop) && state.coffeeShops.length > 0) {
      const coffeeShopFound = state.coffeeShops.find((coffeeShop) => {
        return coffeeShop.id.toString() === id;
      });
      setCoffeeShop(coffeeShopFound);
    }
  }, [id, state, coffeeShop]);


  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const {name, address, neighborhood, imgUrl} = coffeeShop;

  const handleUpvoteButton = () => {
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              ← Back to home
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl || 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name || 'main image'}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/places.svg" width="24" height="24" alt='places icon'/>
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/nearMe.svg" width="24" height="24" alt='near me icon'/>
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" alt='star icon'/>
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;