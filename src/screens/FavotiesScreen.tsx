import { StyleSheet, View } from "react-native";
import { useMemo, useState } from "react";

import Screen from "../components/Screen";
import { useFavouriteStoreAsync } from "../store/Favorites.store";
import { Locations, services } from "../constants/data";
import NoFavorites from "../components/favorites/NoFavorites";
import FavoriteList from "../components/favorites/FavoriteList";
import FavFilterList from "../components/favorites/FavFilterList";

const FavotiesScreen = () => {
  const [activeId, setActiveId] = useState(0);

  const { favorites } = useFavouriteStoreAsync((state) => ({
    favorites: state.favorites,
  }));

  const favLocations = Locations.filter((location) => {
    return favorites.includes(location.id);
  });
  const filterdLocation = useMemo(() => {
    return activeId === 0
      ? favLocations
      : [...favLocations].filter((item) => item.serviceId === activeId);
  }, [activeId, favorites]);

  if (favorites.length === 0) return <NoFavorites />;

  return (
    <Screen>
      <View
        style={styles.container}
      >
        <FavFilterList
          data={services}
          activeId={activeId}
          setActiveId={setActiveId}
        />
        {/*filter items*/}
        {/* <View style={{ paddingVertical: 10 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={services}
            renderItem={({ item }) => {
              return <FilterItem item={item} />;
            }}
          />
        </View> */}
        <FavoriteList Fovaties={filterdLocation} />
      </View>
    </Screen>
  );
};

export default FavotiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  }
});
