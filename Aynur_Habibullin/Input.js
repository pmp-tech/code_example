import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { colors } from "utils/colors";
import Eye from "assets/eye.svg";
import { moderateScale } from "utils/normalize";
import { dimensions } from "utils/dimisions";
import MaskInput from "react-native-mask-input";
import { masks } from "utils/phone_masks";
import { useToggle } from "hooks/useToggle";

export const Input = ({
  value,
  title,
  flex,
  is_error,
  setError,
  onChangeText,
  is_password,
  onBlur,
  dop_styles,
  is_multiline,
  marginTop,
  is_phone,
  is_title_always_visible,
  height,
  no_shadow,
  ...props
}) => {
  const [is_focused, SetIsFocused] = useToggle(false);
  const [is_text_hidden, SetIsTextHidden] = useToggle(false);

  //конфигурация теней на основе состояния инпута
  let boxShadow =
    value && !is_error && !is_focused && !no_shadow
      ? {
          startColor: "#00000010",
          finalColor: "#00000002",
          offset: [0, 5],
        }
      : {
          startColor: "#0000",
          finalColor: "#0000",
          offset: [0, 0],
          distance: 0,
          corners: [],
          sides: [],
          size: 0,
        };

  //добавление стилей к инпуту
  let input_style = [styles.input, dop_styles];
  if (is_focused) input_style.push(styles.input_focus);
  if (is_error) input_style.push(styles.input_error);
  if (is_multiline) input_style.push(styles.input_multilynes);
  if (is_phone) input_style.push(styles.input_phone);

  //измениние маски телефона на основе ввода
  const ChangeMask = (text) => {
    if (!is_phone) return masks["empty"];
    let first_number = text[0];
    let third_number = text[2];
    let fourh_number = text[3];
    switch (first_number) {
      case "7":
        return masks["Russia"];
      case "3":
        switch (third_number) {
          case "5":
            return masks["Belarus"];
          case "4":
            return masks["Armenia"];
          default:
            if (fourh_number) return masks["empty"];
            else return masks["Belarus"];
        }
      case "9":
        return masks["Georgia"];
      case "6":
        return masks["Thailand"];
    }
    return masks["Russia"];
  };

  
  const handleBlur = () => {
    if (onBlur) onBlur();
    SetIsFocused();
  };

  const handleChange = (format_text, text) => {
    onChangeText(text);
    if (setError) setError(false);
  };


  let is_title_visible =
    (title && value) || is_phone || is_title_always_visible;

  return (
    <View
      style={{
        height: height || dimensions.height / 10,
        marginTop: marginTop || 20,
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Shadow
        containerViewStyle={{ flex: 1 }}
        viewStyle={{ flex: 1, width: "100%", paddingHorizontal: 1 }}
        {...boxShadow}
      >
        <View style={{ height: "100%", justifyContent: "center" }}>
          <MaskInput
            mask={ChangeMask}
            secureTextEntry={is_text_hidden}
            style={input_style}
            value={value}
            onBlur={handleBlur}
            onFocus={SetIsFocused}
            onChangeText={handleChange}
            multiline={is_multiline}
            {...props}
          />
          {is_phone ? (
            <Text allowFontScaling={false} style={styles.plus}>
              +
            </Text>
          ) : null}
        </View>
      </Shadow>

      {is_title_visible ? (
        <View style={[styles.title, { top: !is_multiline ? "-10%" : "-5%" }]}>
          <Text
            style={{
              color: is_title_always_visible && value ? "black" : "#C5BEBE",
              fontFamily: "Inter-Regular",
              fontSize: moderateScale(14),
            }}
          >
            {title}
          </Text>
        </View>
      ) : null}

      {is_password ? (
        <TouchableOpacity
          onPress={SetIsTextHidden}
          style={{ position: "absolute", right: 10 }}
        >
          <Eye width={30} height={30} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 18,
    alignSelf: "stretch",
    color: "black",
    borderWidth: 1,
    paddingLeft: 20,
    fontSize: 17,
    borderColor: "#E5E3E2",
  },
  input_error: {
    backgroundColor: "#FEF8F7",
    borderColor: "#F7C2BE",
  },
  input_focus: {
    borderColor: colors.orange,
  },
  input_multilynes: {
    paddingTop: 20,
    textAlignVertical: "top",
    paddingRight: 20,
  },
  title: {
    position: "absolute",
    padding: 3,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "white",
    left: "5%",
    borderRadius: 10,
  },
  input_phone: {
    paddingLeft: 30,
  },

  plus: {
    color: "black",
    position: "absolute",
    fontSize: moderateScale(17),
    elevation: 20,
    zIndex: 2,
    left: 20,
  },
});
