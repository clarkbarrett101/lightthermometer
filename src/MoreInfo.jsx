export default function MoreInfo({ setPage }) {
  return (
    <View>
      <Text
        style={{
          fontSize: 32,
          fontFamily: "Poiret One",
          textAlign: "center",
          padding: 16,
        }}
      >
        The app determines the color temperature of the lights in the room by
        using the screen to emit a color of light onto a surface, then using the
        front camera to measure if the surface's color got warmer or cooler
        relative to when the screen was off. It then cycles through colors to
        find one that keeps the color balance of the surface about the same as
        when the screen was off. This would mean the color balance of the screen
        is the same as the lights in the room. Because the measurements are
        relative to the color of the surface, any surface can be used, although
        lighter surfaces will give more consistent results as they catch the
        light better. The results take into account all light sources in the
        room including both natural and artificial light, so in rooms with
        windows and lightbulbs the results will be a mix of them all.
      </Text>
      <LinkButton
        icon={require("../assets/back.png")}
        target="home"
        setPage={setPage}
        width={60}
        height={60}
      />
    </View>
  );
}
