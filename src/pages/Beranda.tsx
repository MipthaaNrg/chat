import { createAnimation, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonModal, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { checkmarkDoneOutline, checkmarkOutline, chevronBackOutline, logOutOutline, sendOutline } from 'ionicons/icons';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Beranda.css';
import $ from 'jquery';
import { PushNotifications, PushNotificationSchema } from '@capacitor/push-notifications'

const Beranda: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [dataChat, setDataChat] = useState([])
  const [isModalChat, setIsModalChat] = useState(false)
  const [detailNamaCustomer, setDetailNamaCustomer] = useState('')
  const [dataOpenUserId, setDataOpenUserId] = useState('')
  const [dataOpenChannelId, setDataOpenChannelId] = useState('')

  useIonViewWillEnter(()=>{
    listChat()
  })

  function listChat(){
    let data = new FormData();
    data.append('status', '1')
    $.ajax({
      type: "POST",
      url: "https://xpdcargo.id/login/Callback2/listComplain",
      dataType: 'JSON',
      data:data,
      processData:false,
      contentType:false,
      beforeSend:function(){
        setDataChat([])
        setIsLoading(true)
      },
      success:function(r:any){
        setIsLoading(true)
        setDataChat(r.data)
        console.log(r.data)
      },
      error:function(err){
        console.log(err)
        setIsLoading(false)
      }
    })
  }

  const inAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = createAnimation()
        .addElement(root?.querySelector('.modal-wrapper')!)
        .keyframes([
            { offset: 0, opacity: '0', transform: 'translateX(100%)' },
            { offset: 1, opacity: '0.99', transform: 'translateX(0)' },
        ]);

    return createAnimation()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };
  const outAnimation = (baseEl: HTMLElement) => {
      return inAnimation(baseEl).direction('reverse');
  };
  const inAnimation2 = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = createAnimation()
        .addElement(root?.querySelector('.modal-wrapper')!)
        .keyframes([
            { offset: 0, opacity: '0', transform: 'scale(0.9)' },
            { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);

    return createAnimation()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(200)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };
  const outAnimation2 = (baseEl: HTMLElement) => {
      return inAnimation2(baseEl).direction('reverse');
  };

  // PushNotifications.addListener('pushNotificationReceived', (notifications: PushNotificationSchema)=>{ //Tambahin
    
  // })

  function openChat(id:any, channel_id:any, name:any, kode:any, user_id:any, order_id:any, created_at:any){
    let data = new FormData()
    data.append('user_id', user_id)
    data.append('driver_id', "1997")
    data.append('channel_id', channel_id)
    $.ajax({
      type: "POST",
      url: "https://xpdcargo.id/login/Callback/apiCekChat",
      data:data,
      processData: false,
      contentType: false,
      dataType: "JSON",
      beforeSend:function(){
          $("#chatLog").empty()
      },
      success:function(r){
        setIsModalChat(true)
      },
      error:function(err){
          console.log(err)
      }
  })
}

function sendChat(){
  var val = String($("input[name='pesan']").val())
  let data = new FormData()
  if(String(val).trim() !== ''){
      data.append('pesan', val)
      data.append('user_id', String(localStorage.getItem('userid')))
      data.append('customer_id', String(dataOpenUserId))
      data.append('channel_id', String(dataOpenChannelId))
      $.ajax({
          type: "POST",
          url: "https://xpdcargo.id/login/Callback/sendChatXPCD",
          data: data,
          processData: false,
          contentType: false,
          dataType: "JSON",
          beforeSend:function(){
              setIsLoading(true)
          },
          success:function(r){
            setIsLoading(false)
            $("ion-input[name='pesan']").val('')
        },
        error:function(err){
          console.log(err)
          setIsLoading(false)
        }
      })
  }
  
}

function logout(){
  localStorage.setItem('isLogin', '0')
  localStorage.removeItem('nama')
  localStorage.removeItem('email')
  window.open('/Login','_self')
}

 
  return (
    <IonPage>
       <IonHeader mode='ios'>
          <IonToolbar mode='ios'>
            <IonTitle></IonTitle>
            <IonButtons slot='end' onClick={()=>{logout()}}>
              <IonButton>
              <IonIcon icon={logOutOutline} style={{ borderRadius:"50px", fontSize:"24px", padding:"10px"}}/>
              </IonButton>
            </IonButtons>
          </IonToolbar>
          {/* {(isLoading === true)?
          <IonGrid style={{background:"rgba(200,200,200,0.15)", padding:0, margin:0}}>
            <IonRow>
              <IonCol size='12' style={{textAlign:"center", padding:"2px 0"}}>
                <IonText mode='ios' style={{fontSize:"12px", color:"black"}}>
                  Memuat data...
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
          :''} */}
        </IonHeader>
        <IonContent fullscreen>
        {(dataChat.map((a, index) => {
          return(
          <IonGrid key={index} style={{border:"1px solid #DEDEDE", margin:"10px", borderRadius:"10px"}} onClick={()=>{openChat(a['id'], a['channel_id'],a['name'], a['kode'],a['user_id'],a['order_id'],a['message'])}}>
            <IonRow>
              <IonText mode='ios'>{a['kode']}</IonText>
            </IonRow>
            <IonRow>
              <IonCol size='6' style={{textAlign:"start"}}>{a['message']}</IonCol>
              <IonCol size='6' style={{textAlign:"end"}}>{a['created_at']}</IonCol>
            </IonRow>
          </IonGrid>
              )
            }))}
        </IonContent>

        <IonModal mode='ios' isOpen={isModalChat} onDidDismiss={()=>{setIsModalChat(false)}} animated={true} enterAnimation={inAnimation} leaveAnimation={outAnimation}>
        <IonHeader mode='ios'>
          <IonToolbar mode='ios'>
            <IonButtons slot='start'>
              <IonButton mode='ios' fill='clear' color='primary' onClick={()=>{setIsModalChat(false)}}>
                <IonIcon icon={chevronBackOutline} slot='start' style={{margin:0, padding:0}} />
                BACK
              </IonButton>
            </IonButtons>
            <IonTitle>{String(detailNamaCustomer).toUpperCase()}</IonTitle>
          </IonToolbar>
          {/* {(isLoading === true)?
          <IonGrid style={{background:"rgba(200,200,200,0.15)", padding:0, margin:0}}>
            <IonRow>
              <IonCol size='12' style={{textAlign:"center", padding:"2px 0"}}>
                <IonText mode='ios' style={{fontSize:"12px", color:"black"}}>
                  Mengirim pesan..
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
          :''} */}
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid>
            {(dataChat.length > 0)?dataChat.map((a, index) => {
              return(
                <IonRow key={index}>
                  <IonCol size='12' style={(a['dari'] === 'customer')?{textAlign:"start"}:{textAlign:"end"}}>
                    <IonText mode='ios' style={(a['dari'] === 'customer')?{display:"flex", flexDirection:'column', background:"#8491BF", padding:"5px 10px", borderRadius:"15px 15px 15px 0", margin:"0 30vw 0 0"}:{display:"flex", flexDirection:'column', background:"#1579F7", padding:"5px 10px", borderRadius:"15px 15px 0 15px", margin:"0 0 0 30vw"}}>
                      <span style={{fontSize:"13px", color:"white"}}>{a['message']}</span>            
                      <span style={{display:"flex", flexDirection:"row", fontSize:"10px", justifyContent:"end"}}>
                        {a['created_at']}
                        {(a['dari'] === 'customer')?
                          <IonIcon icon={(a['status'] === 'Belum Dibaca')?checkmarkOutline:checkmarkDoneOutline} style={(a['status'] === 'Belum Dibaca')?{color:"#BDC3C7", margin:"0 0 0 5px", fontSize:"12px"}:{color:"#0F0ADE", margin:"0 0 0 5px", fontSize:"12px"}}></IonIcon>:
                        ""}
                      </span>
                    </IonText>  
                  </IonCol>
                </IonRow>
              )
            }):''}
          </IonGrid>
        </IonContent>
        <IonFooter mode='ios' style={{background:"white"}}>
            <IonGrid>
              <IonRow style={{padding:"5px 2px"}}>
                <IonCol size='10' style={{padding:"3px 5px", background:"#D7D8DA", borderRadius:"50px", margin:0, border:"solid 1px #9D9FA6"}}>
                  <IonInput mode='ios' inputMode='text' placeholder='Ketik Pesan' name='pesan' style={{color:"black", fontSize:"13px", margin:0, padding:0, textAlign:"start"}} />
                </IonCol>
                <IonCol size='2' style={{padding:"2px 0", textAlign:"center"}} onClick={()=>{sendChat()}}>
                  <IonIcon icon={sendOutline} style={{background:"#3880FF", borderRadius:"50px", fontSize:"18px", padding:"10px"}}/>
                </IonCol>
              </IonRow>
            </IonGrid>
        </IonFooter>
      </IonModal>
    </IonPage>
  );
};

export default Beranda;
