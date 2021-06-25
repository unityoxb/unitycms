import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Header } from 'semantic-ui-react'

function Stage(props) {

    const [loading, setLoading] = useState(true);
    const [stage, setStage] = useState([])
    const [error, setError] = useState('')


    useEffect(() => {
        let token = window.localStorage.getItem("scifanchain_access_token")
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.get('https://api.scifanchain.com/stages/1')
            .then(function (response) {
                // 处理成功情况
                setLoading(false)
                setStage(response.data)
                setError('')
                console.log(response);
            })
            .catch(function (error) {
                // 处理错误情况
                setLoading(false)
                setStage({})
                setError('很抱歉，没有获取到数据！')
                console.log(error);
            });
    }, [])

    return (
        <div>
            {loading &&
                <div className="text-center">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="sr-only">正在加载...</span>
                    </div>
                </div>
            }

            {!loading && !error &&
                <Container>
                    <Header>{stage.title}</Header>
                    <p>{stage.content}</p>
                </Container>
           }
        </div>
    )
}

export default Stage