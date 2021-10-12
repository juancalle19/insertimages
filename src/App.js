import React, {useState} from 'react'
import shortid from 'shortid'


function App() {

  const [images, setImages] = useState([])
  const [imageVisible, setImageVisible] = useState(false)
  const [imagesVisible, setImagesVisible] = useState([])
  
  const picture = new Image()
  const width =796
  const height = 1123
  const ratio = {
    ratio:0
  }  
  const orientation = {
    orientation: ""
  }
  const newWidht = {
    newWidht:0
  }
  const newHeight = {
    newHeight:0
  }

  const captureImage = (e) => {
    
    e.preventDefault()
    setImages([])
    console.log(e)
    console.log(images)
        
    console.log(e.target.files[0])
    const URL = window.URL || window.webkitURL
    picture.src = URL.createObjectURL(e.target.files[0])
    picture.onload=  ()=>{

      
      if(picture.width > picture.height){
        ratio.ratio= picture.width/picture.height
        console.log(ratio.ratio)
        orientation.orientation="Horizontal"
        
      }else{
        ratio.ratio = picture.height/picture.width
        orientation.orientation = "Vertical"
      }

      const objectImage = {
        id:shortid.generate(),
        name: e.target.files[0].name,
        src: String(picture.src) ,
        width:picture.width,
        height:picture.height,
        orientation: orientation.orientation,
        ratio: ratio.ratio
      }
      
      
      console.log(objectImage.src)
      setImages([...images,objectImage])
          }
    
    console.log(images)
  }

  

  

  const addImage = async (e)=>{
    e.preventDefault()
    console.log(images.length)
    if (images.length<1) {
      alert("No ha ingresado imagenes o Formato de archivo no valido")
      return
    }

    console.log(images)
    images.forEach(element => {
      
      if (element.width > element.height) {

        if (element.width > height) {
          
          newWidht.newWidht=height
          newHeight.newHeight= (Math.round(height/element.ratio))
          
        }else{
          if (element.height > width) {
            
            newWidht.newWidht=(Math.round(width*element.ratio))
            newHeight.newHeight = width
            
          }else{
            newWidht.newWidht= element.width
            newHeight.newHeight= element.height
          }
        }
        
      } else if(element.height > element.width){
        if (element.height > height) {
          
          newWidht.newWidht= (Math.round(height/element.ratio))
          newHeight.newHeight = height
          
        }else {
          if (element.width > width) {
            
            newWidht.newWidht = width
            newHeight.newHeight = (Math.round(width*element.ratio))
            
          }else{
            
            newWidht.newWidht = element.width
            newHeight.newHeight = element.height
            
          }
        }
      }else{
        if (element.width > width) {
          
          newWidht.newWidht = width
          newHeight.newHeight = width
          
          return
        }else{
          
          newWidht.newWidht = element.width
          newHeight.newHeight = element.height
          
        }
      }
      const newImage = new Image(newWidht,newHeight)
      newImage.src= element.src
      newImage.onload = ()=>{
      }
      localStorage.setItem("url", newImage.src)

      const objectImage = {
        id:element.id,
        name: element.name,
        src: String(newImage.src) ,
        width: newWidht.newWidht,
        height:newHeight.newHeight,
        orientation: element.orientation,
        ratio: element.ratio
      }
      
      setImagesVisible([...imagesVisible,objectImage])
      console.log(objectImage)
    })
    setImageVisible(true)
    console.log(imagesVisible)
    
  }
  
  return (
    <div className="container mt-5">
      <h1 className="text-center">Insertar Imagenes</h1>
      <hr color="black"/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Imagenes</h4>
          <ul>
            {
              imageVisible? imagesVisible.map((image)=>(
                
                <li className="list-group-item" >
                  <span className="border border-dark" key={image.id}>
                    <img src={image.src}  className="w-50"  />  
                  </span>
                  <h6>Ancho = {image.width} Alto = {image.height} Orientación = {image.orientation}</h6>
                </li>
              )) : ()=>{}
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">Formulario</h4>
          <hr color="black"/>
          <form onSubmit={addImage}>
            <input type="file"  onChange={captureImage} accept=".jpg" />
            <button type="submit" className="btn btn-primary mt-2">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;
