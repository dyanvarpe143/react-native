import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AppRegistry
} from 'react-native';
import { WebView } from 'react-native-webview';


export default class Test extends React.Component<any, any> {
  state = {
    status: '[Ready] Done!',
    value: '',
  };
  

  handleChange = (value: string) => {
    this.setState({ value });
  };
  handleGet = async () => {
    // const info =  this.onMessage.data;
   
    
    //alert("get");
    //this.setState({
      //status: `[Get From Web] '${this.onMessage.data}'`,
    //});
  };
  handleSet = async () => {
    
    this.setState({ status: '[Set To Web] Sending' });
    
    let data1=this.state.value;
    
    this.webview.postMessage(`"${data1}"`);
    this.setState({ status: '[Set To Web] Success' });
  };
  
   onMessage=(event) =>{
   //console.log(data);   
   const { data } = event.nativeEvent
            // alert(data)
            
         this.setState({
          
    status: `[Receive From Web] '${data}'`
    //alert(data);
          });

        
    
   }
  
  renderWebSide() {
    return (
      <View style={styles.webviewArea}>
        <WebView useWebKit
          ref={ (webview) => this.webview = webview }     
          onMessage={this.onMessage}   
         // onMessage={this.onWebViewMessage}
          source={{ html }}
        />
      </View>
    );
  }
  
  renderRNSide() {
    return (
      <View style={styles.rnArea}>
        <Text style={styles.titleText}>React Naitve Side: </Text>
        <Text style={styles.statusText}>{this.state.status}</Text>
        <TextInput
          style={styles.input}
          placeholder="Some..."
          value={this.state.value}
          onChangeText={this.handleChange}
        />
        <View>
          <TouchableOpacity style={styles.button} onPress={this.handleSet}>
            <Text>Send To Web</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleGet}>
            <Text>Get From Web</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderRNSide()}
        {this.renderWebSide()}
      </View>
    );
  }
}

const styles = {
  container: {
    paddingTop: 20,
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center',
  },
  input: {
    margin: 5,
    padding: 5,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
  },
  rnArea: {
    flex: 1,
    borderWidth: 4,
    borderColor: '#666',
    borderStyle: 'solid',
    padding: 5,
  },
  button: {
    borderColor: '#000',
    borderWidth: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 15,
  },
  webviewArea: {
    flex: 1,
    borderWidth: 4,
    borderColor: '#000',
    borderStyle: 'solid',
  },
};

const html = `
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <title>test</title>
    <style>
        .status {
            font-size: 12px;
            text-align: center;
        }

        .input {
            width: 100%;
            box-sizing: border-box;
            line-height: 25px;
            margin: 5px 0;
        }

        button {
            display: block;
            width: 100%;
            box-sizing: border-box;
            margin: 5px 0;
        }
    </style>
</head>

<body>
    <h1>Web Side:</h1>
    <p class="status">[Ready] Done!</p>
    <input class="input" type="text" placeholder="Some..." />
    <button class="set" label="Send To RN">Send To RN</button>
    <button class="get" label="Get From RN">Get From RN</button>

    <script src="https://cdn.bootcss.com/es6-promise/4.0.5/es6-promise.auto.min.js"></script>
    <!-- TEST
    <script src="https://tb1.bdstatic.com/tb/libs/rnwi-browser.js"></script>
     <script src="http://127.0.0.1:8081/browser.umd.js?id=3"></script>
    -->
    <script src="http://127.0.0.1:8081/browser.umd.js?id=3"></script>
    <script src="./node_modules/react-native-webview-invoke/dist/browser.umd.js"></script>

    <script>
         var $status = document.querySelector('.status')
        var $input = document.querySelector('.input')         
         document.addEventListener("message", function(data) {
        $status.innerText = '[Receive From RN] "' + data.data + '"'
  });
                
    document.querySelector('.set').addEventListener('click', function () {
                $status.innerText = '[Set To RN] Sending' 
                var $db=document.querySelector('.input')                 
                window.ReactNativeWebView.postMessage($db.value) 
                $status.innerText = '[Set To RN] Success' 
                        
            })
    </script>
</body>

</html>
`;