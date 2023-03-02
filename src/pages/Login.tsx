import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonLoading, IonRippleEffect, IonRow, IonText, IonToast } from "@ionic/react";
import { checkmarkCircleOutline, closeCircleOutline, lockClosedOutline, personCircleOutline } from "ionicons/icons";
import { useState } from "react";
import $ from 'jquery';

interface ContainerProps { }
const Login: React.FC<ContainerProps> = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isToast, setIsToast] = useState(false)
    const [isToastMessage, setIsToastMessage] = useState('')
    const [isToastColor, setIsToastColor] = useState('')
    const [isToastDuration, setIsToastDuration] = useState(Number)
    function Login(){
        let data = new FormData()
        data.append('username', String($("ion-input[name='loginUsername']").val()))
        data.append('password', String($("ion-input[name='loginPassword']").val()))
        if(String($("ion-input[name='loginUsername']").val()).trim() !== '' && String($("ion-input[name='loginPassword']").val()).trim() !== ''){
            $.ajax({
                type:"POST",
                url: "https://xpdcargo.id/login/Callback2/apiLogin",
                data:data,
                processData:false,
                contentType:false,
                dataType: "JSON",
                beforeSend:function(){
                    setIsLoading(true)
                },
                success:function(r:any){
                    setIsLoading(false)
                    if(r.code === 117){
                        localStorage.setItem('isLogin', '1')
                        localStorage.setItem('nama', r.nama)
                        localStorage.setItem('email', r.email)
                        window.open('/Beranda', '_self')
                    }else{
                        setIsToastMessage(r.message)
                        setIsToastColor('danger')
                        setIsToastDuration(1000)
                        setIsToast(true)
                    }
                },
                error:function(err){
                    console.log(err)
                    setIsLoading(false)
                }
            })
        }else{
            setIsToastMessage('Username/Password masih kosong!')
            setIsToastColor('danger')
            setIsToastDuration(1000)
            setIsToast(true)
        }
    }

    function logout(){
        localStorage.setItem('isLogin', '0')
        localStorage.removeItem('nama')
        localStorage.removeItem('email')
        window.open('/Login','_self')
    }
    return(
        <>
        <IonContent fullscreen>
            <IonGrid style={{padding:"10% 10%"}}>
                <IonRow>
                    <IonCol size="12" style={{textAlign:"center", padding:"15% 0 25% 0"}}>
                        <IonText mode="ios" style={{fontSize:"26px", fontWeight:"bold"}}>MASUK</IonText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="2" style={{textAlign:"center", margin:0, padding:"10px 0", background:"#DEDEDE", borderRadius:"10px 0 0 10px"}}>
                        <IonIcon icon={personCircleOutline} style={{fontSize:"26px", color:"teal"}}></IonIcon>
                    </IonCol>
                    <IonCol size="10" style={{textAlign:"start", background:"#DEDEDE", borderRadius:"0 10px 10px 0"}}>
                        <IonInput mode="ios" inputMode="text" placeholder="Email" style={{fontSize:"14px", color:"black"}} required={true} name='loginUsername'></IonInput>
                    </IonCol>
                    <IonCol size="2" style={{textAlign:"center", margin:"10px 0", padding:"10px 0", background:"#DEDEDE", borderRadius:"10px 0 0 10px"}}>
                        <IonIcon icon={lockClosedOutline} style={{fontSize:"26px", color:"teal"}}></IonIcon>
                    </IonCol>
                    <IonCol size="10" style={{textAlign:"start",margin:"10px 0", background:"#DEDEDE", borderRadius:"0 10px 10px 0"}}>
                        <IonInput mode="ios" inputMode="text" placeholder="Kata Sandi" style={{fontSize:"14px", color:"black"}} required={true} name='loginPassword'></IonInput>
                    </IonCol>
                    <IonCol size="12" style={{padding:0}}>
                        <IonButton mode="ios" expand="block" fill="solid" color='dark' style={{color:"white"}} onClick={()=>{Login()}}>
                            <IonRippleEffect></IonRippleEffect>
                            MASUK
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
            <IonToast 
            mode='ios'
            isOpen={isToast}
            message={isToastMessage}
            onDidDismiss={()=>{setIsToast(false)}}
            color={isToastColor}
            duration={isToastDuration}
            icon={(isToastColor === 'danger')?closeCircleOutline:checkmarkCircleOutline}
            position='top'
            />
            <IonLoading 
            mode='ios'
            isOpen={isLoading}
            spinner='circular'
            />
        </IonContent>
        </>
    )
}
export default Login;
