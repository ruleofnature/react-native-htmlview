
import React, {PureComponent} from 'react';
import {
  //Image,
  Dimensions,

  ActivityIndicator
} from 'react-native';
//require('react-native').Image
import {Image} from "react-native-elements";
import FastImage from 'react-native-fast-image'

const {width} = Dimensions.get('window');
import AutoHeightImage from 'react-native-auto-height-image';

const baseStyle = {
  backgroundColor: 'transparent',
};

export default class AutoSizedImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // set width 1 is for preventing the warning
      // You must specify a width and height for the image %s
      calcImgHeight:0,
      width: this.props.style.width || 1,
      height: this.props.style.height || 1,
    };
  }

  componentDidMount() {
//   componentDidMount() {
    //avoid repaint if width/height is given
    if (this.props.style.width || this.props.style.height) {
      return;
    }
    require('react-native').Image
    .getSize(this.props.source.uri, (w, h) => {
      this.setState({width: w, height: h});
    });
  }

  render() {
    const finalSize = {};
    if (this.state.width > width) {
      finalSize.width = width;
      const ratio = width / this.state.width;
      finalSize.height = this.state.height * ratio;
    }
    const style = Object.assign(
      baseStyle,
      this.props.style,
      this.state,
      finalSize
    );
    let source = {};
    let urlHeight = this.props.source.uri.match(new RegExp("[?&]" + "height" + "=(.*?)(&|$|#)"))
    if (!finalSize.width || !finalSize.height) {
      //source = Object.assign(source, this.props.source, this.state);
      //return <AutoHeightImage  width={width-1} source={{uri: this.props.source.uri}}/>;
     return <FastImage style={{ width: width-30, height:urlHeight? urlHeight: this.state.calcImgHeight }}
                      source={{
                            uri: this.props.source.uri,
                            priority: FastImage.priority.fast,
                        }}
                        onLoad={evt =>
                         this.setState({
                           calcImgHeight:
                             evt.nativeEvent.height / evt.nativeEvent.width * width, // By this, you keep the image ratio
                         })}
                      />;

      /*return <Image style={{ width: width-30, height: urlHeight? urlHeight: 300}}
      onLoadEnd={evt =>
       this.setState({
         calcImgHeight:
           evt.nativeEvent.height / evt.nativeEvent.width * width, // By this, you keep the image ratio
       })}
        PlaceholderContent={<ActivityIndicator />} source={{uri:this.props.source.uri}} />;
          */
    } else {
      //source = Object.assign(source, this.props.source, finalSize);
      //return <AutoHeightImage  width={width-30} source={{uri: this.props.source.uri}} />;
    //  return <AutoHeightImage  width={width-30} source={{uri: this.props.source.uri}}/>;
    return <FastImage style={{ width: width-30, height: urlHeight? urlHeight: this.state.calcImgHeight }}
                     source={{
                           uri: this.props.source.uri,
                           priority: FastImage.priority.fast,
                       }}
                       onLoad={evt =>
                        this.setState({
                          calcImgHeight:
                            evt.nativeEvent.height / evt.nativeEvent.width * width, // By this, you keep the image ratio
                        })}
                     />;
  /*return <FastImage style={{ width: width-30, height: this.state.height }}
                   source={{
                         uri: this.props.source.uri,
                         priority: FastImage.priority.fast,
                     }}
                  />;*/


    }



    //return <FastImage style={style} source={{uri:　source}} />;
    //return <Image style={style} source={source} />;
  }
}
