import React, { Component } from 'react';
import { StyleSheet, Text as Text1 } from 'react-native';
import { isLangArabic } from '../../helpers/auth';
import { responsiveScale } from '../../styles/mixins';
import { colors, font, fonts, sizes } from '../../styles/theme';

export default class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isArabicLang: false,
    };
  }

  async componentDidMount() {
    const ar_lang = await isLangArabic();
    this.setState({ isArabicLang: ar_lang });
  }
  render() {
    const { isArabicLang } = this.state;
    const {
      h1,
      h2,
      h3,
      heading,
      title,
      body,
      caption,
      header,
      small,
      size,
      transform,
      align,
      // styling
      sfdisplay,
      sftext,
      opensans,
      regular,
      bold,
      semibold,
      medium,
      weight,
      light,
      center,
      right,
      spacing, // letter-spacing
      height, // line-height
      //number of lines
      // colors
      family,
      color,
      primary,
      secondary,
      style,
      children,
      isArabic,
      ...props
    } = this.props;

    const textStyles = [
      styles.text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      title && styles.title,
      header && styles.header,
      body && styles.body,
      heading && styles.heading,
      caption && styles.caption,
      small && styles.small,
      size && { fontSize: responsiveScale(size) },
      transform && { textTransform: transform },
      align && { textAlign: align },
      height && { lineHeight: height },
      spacing && { letterSpacing: spacing },
      weight && { fontWeight: weight },
      semibold && {
        fontFamily: isArabicLang
          ? font.inter_SemiBold //font.muna
          : sfdisplay
          ? font.inter_SemiBold
          : font.roboto_Bold,
      },
      regular && {
        fontFamily: isArabicLang
          ? font.inter_Regular //font.muna
          : sfdisplay
          ? font.inter_Regular
          : font.roboto_Regular,
      },
      bold && {
        fontFamily: isArabicLang
          ? font.inter_bold //font.muna
          : sfdisplay
          ? font.inter_bold
          : font.roboto_Bold,
      },
      medium && {
        fontFamily: isArabicLang
          ? font.inter_Medium //font.muna
          : sfdisplay
          ? font.inter_Medium
          : font.roboto_Medium,
      },

      family && { fontFamily: family },
      light && styles.light,
      center && styles.center,
      right && styles.right,
      color && styles[color],
      color && !styles[color] && { color },
      // color shortcuts
      primary && styles.primary,
      secondary && styles.secondary,

      // isArabic && styles.arabic,
      style, // rewrite predefined styles
    ];

    return (
      <Text1 style={[{ textAlign: 'left' }, textStyles]} {...props}>
        {children}
      </Text1>
    );
  }
}

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: sizes.font,
  },
  // variations
  regular: {
    fontFamily: font.roboto_Regular,
  },

  bold: {
    fontFamily: font.sf_text_bold,
  },

  medium: {
    fontFamily: font.sf_text_medium,
  },

  // position
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  // colors
  primary: { color: colors.primary },
  secondary: { color: colors.secondary },
  // fonts
  h1: fonts.h1,
  h2: fonts.h2,
  header: fonts.header,
  h3: fonts.h3,
  heading: fonts.heading,
  title: fonts.title,
  body: fonts.body,
  caption: fonts.caption,
  small: fonts.small,
  arabic: { transform: [{ scaleX: -1 }], textAlign: 'right' },
});
