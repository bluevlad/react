import React from 'react'
import {
  Text, View,
  TouchableHighlight, ScrollView,
  StatusBar, ActivityIndicator, Dimensions,
  Platform, Image
} from 'react-native'

// assets
import { color } from 'react-native-material-design-styles'
import logo from './y18.gif'
import styles from './AppStyles'

// utils
//import moment from 'moment'

// ComponentsmarginTop:
const Card = ({ children }) => <View style={styles.card}>{children}</View>

const cursorStyle = Platform.OS === 'web' ? { cursor: 'pointer' } : {}

const Overlay = ({ children, visible }) => (
  (visible) ? (
    <View style={{ position: 'absolute', marginTop: 48, zIndex: 1 }}>
      <Text style={{ fontSize: 28, marginLeft: Dimensions.get('window').width * 0.9, backgroundColor: 'rgba(52,52,52, 0.0)', color: 'white', zIndex: 3 }}>⏏</Text>
      <View style={{ padding: 10, marginTop: -17, width: Dimensions.get('window').width, height: 400, backgroundColor: 'rgba(255,255,255,80)' }}>
        {children}
      </View>
    </View>
  ) : <View />
)

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.scrollToTop = this.scrollToTop.bind(this)
  }

  scrollToTop() {
    this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: true })
  }

  render() {
    const { items, errors, loading, filter, overlayVisible, onLoadMore, onLoadItems, onOpenUrl, onToggleOverlay } = this.props

    return (
      <Card>
        <View style={styles.body}>

          <View style={[styles.column, styles.header, { height: 75, paddingTop: 20 }]}>
            <View style={[styles.row, { height: 50 }]}>
              <View style={styles.row}>
                <Image source={logo} style={{ width: 20 }} />
                <Text style={[{ fontWeight: 'bold', paddingLeft: 4 }]}>사물함 예약 시스템</Text>
                <Text style={[{ fontSize: 12, paddingLeft: 4 }]}> {Platform.OS}</Text>
              </View>
              <TouchableHighlight
                style={[styles.button, filter === 'Top' ? styles.buttonOrange : null]}
                underlayColor={color.paperOrange200.color}
                onPress={() => { onLoadItems('Top'); this.scrollToTop() }}>
                <View style={styles.row}>
                  <Text style={{ color: 'white', fontWeight: 'bold', paddingRight: 5 }}>Top</Text>{filter === 'Top' && loading ? <ActivityIndicator /> : null}
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.button, filter === 'Latest' ? styles.buttonOrange : null]}
                underlayColor={color.paperOrange200.color}
                onPress={() => { onLoadItems('Latest'); this.scrollToTop() }}>
                <View style={styles.row}>
                  <Text style={{ color: 'white', fontWeight: 'bold', paddingRight: 5 }}>Latest</Text>{filter === 'Latest' && loading ? <ActivityIndicator /> : null}
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={color.paperOrange200.color}
                onPress={() => { onToggleOverlay() }}>
                <Text style={{ color: 'white', fontWeight: 'bold', padding: 10 }}>?</Text>
              </TouchableHighlight>
            </View>
            {Object.keys(errors).length > 0 ? (
              <View style={[styles.row, { flex: 1, backgroundColor: 'red' }]}>
                {Object.keys(errors).map((error, i) => (
                  <Text key={i}>. {errors[error].message}</Text>
                )
                )}
              </View>
            ) : null}
          </View>

          <View style={styles.scrollViewContainer}>
            <ScrollView
              ref='_scrollView'
              className='scrollView'
              contentContainerStyle={styles.scrollViewContentContainerStyle}
              scrollEventThrottle={1} // 1 event per second
              style={styles.scrollViewStyle}
            >
              {items.map((item, i) => (
                <View key={i}>
                  <View style={styles.itemRow}>
                    <Text style={{ flex: 1 }}>
                      <Text
                        style={[{ fontWeight: 'bold', fontSize: 18 }, cursorStyle]}
                        onPress={() => onOpenUrl(`http://localhost:8080/api/getLocker?box_cd=${item.BOX_CD}`)}>{i + 1}. {item.BOX_NM}</Text>
                      <Text style={[{ flex: 1, color: '#979797' }, cursorStyle]}> {item.author}</Text>
                    </Text>
                  </View>
                  <View style={styles.itemSubRow}>
                    <Text style={{ padding: 2 }}>사용료 : {item.BOX_PRICE}원</Text>
                    <Text style={{ padding: 2 }}>보증금 : {item.DEPOSIT} 원</Text>
                  </View>
                  <View style={styles.itemSubRow}>
                    <Text style={{ padding: 2 }}>{item.ROW_COUNT}층 | {item.ROW_NUM}열 | {item.START_NUM} - {item.END_NUM} |</Text>
                    <Text style={{ padding: 2}}> {item.UPD_DT}</Text>
                  </View>
                </View>

              ))}
              <View style={[styles.itemRow, styles.buttonRow]}>
                <TouchableHighlight
                  style={[styles.button, styles.buttonGray]}
                  underlayColor={color.paperOrange200.color}
                  onPress={() => onLoadMore()}>
                  <View style={[styles.row, { height: 20 }]}>
                    <Text
                      style={{ fontWeight: 'bold', fontSize: 16, color: color.paperGrey500.color }}>
                      {loading ? null : 'Load more'}
                    </Text>
                    {loading ? <ActivityIndicator /> : null}
                  </View>
                </TouchableHighlight>
              </View>
            </ScrollView>
          </View>

        </View>
      </Card>
    )
  }
}
