import React, { useState } from 'react'
import './App.css'
import logo from './logo.png'

function App() {

    const [noticiasSpace, definirNoticiasSpace] = useState([])
    const [noticiasNasa, definirNoticiasNasa] = useState([])

    function TrabalharNoticiaSpace() {
        const listagemNoticia = noticiasSpace.map(function(noticia) {
            const noticiaData = new Date(noticia.publishedAt)
            const noticiaDataConvertida = noticiaData.toLocaleString("pt-BR")
            return (
                <div className="Noticia" key={noticia.id}>
                    <div className="NoticiaModeloBanner">
                        <img src={noticia.imageUrl} alt="IMAGEM OBTIDA PELA SPACEFLIGHTNOW" width="360px" />
                    </div>
                    <div className="NoticiaModeloDados">
                        <div className="NoticiaTitulo"> 
                            <a href={noticia.url} target="_blank" rel="noreferrer"> {noticia.title} </a>
                        </div>
                        <div className="NoticiaResumo"> {noticia.summary} </div>
                        <div className="NoticiaFonte"> {noticia.newsSite} </div>
                        <div className="NoticiaData"> {noticiaDataConvertida} </div>
                    </div>
                </div>
            )
        })
        return (
            <> { listagemNoticia } </>
        )
    }

    function TrabalharNoticiaNasa() { 
        const listagemNoticia = noticiasNasa.map(function(noticia) {
            return (
                <div className="Imagens" key={noticia.id}>
                    <div className="NoticiaData"> Data Terrestre: {noticia.earth_date} </div>
                    <div className="NoticiaData"> Camera: {noticia.camera.full_name} </div>
                    <div className="NoticiaResumo"> Rover: {noticia.rover.name} </div>
                    <img src={noticia.img_src} alt="IMAGEM OBTIDA PELA NASA" width="200px" />
                </div>
            )
        })
        return (
            <> { listagemNoticia } </>
        )
    }

    async function obterNoticiasSpace() {
        const spaceURL = "https://spaceflightnewsapi.net/api/v2/articles"
        await fetch(spaceURL)
        .then(function(resposta) {
            return resposta.json()
        })
        .then(function(dados) {
            definirNoticiasSpace(dados)
        })
        .catch(function(erro) {
            console.error(`[SPACEFLIGHTNOW] OCORREU UM ERRO AO CARREGAR OS DADOS ${erro.message}`)
        })
    }

    async function obterNoticiasNasa() {
        const nasaURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=${process.env.REACT_APP_API_KEY}`
        await fetch(nasaURL)
        .then(function(resposta) {
            return resposta.json()
        })
        .then(function(dados) {
            definirNoticiasNasa(dados["photos"])
        })
        .catch(function(erro) {
            console.error(`[NASA] OCORREU UM ERRO AO CARREGAR OS DADOS ${erro.message}`)
        })
    }

    return (
        <div className="App">
            <div className="AppTitle"> 
                <img src={logo} alt="Logo do site" width="100px" />
                <br/>
                PROJETO SPACE 
            </div>
            <div className="AppContent">
                <div className="AppContentLeft">
                    <TrabalharNoticiaSpace />
                    <button type="button" onClick={obterNoticiasSpace}> SpaceFlightNews</button>
                </div>
                <div className="AppContentRight" > 
                    <TrabalharNoticiaNasa />
                    <button type="button" onClick={obterNoticiasNasa}> Nasa Rover Photos </button>
                </div>
            </div>
        </div>
    )
}

export default App
