import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {List } from 'semantic-ui-react'

function StageList () {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        axios.get('https:api.scifanchain.com/stages/')
            .then(function (response) {
                // 处理成功情况
                setLoading(false)
                setPosts(response.data.results)
                setError('')
                console.log(response);
            })
            .catch(function (error) {
                // 处理错误情况
                setLoading(false)
                setPosts([])
                setError('很抱歉，没有获取到数据！')
                console.log(error);
            });
    }, [])

    const postList = posts.map((post) => (
        <List.Item key={stage.id} as='a'>{stage.title}</List.Item>
    ));

    return(
        <div>
            { loading &&　
            <div className="text-center">
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">正在加载...</span>
                </div>
            </div>
            }

            {!loading && !error && 
                <List>{postList}</List>
            }
        </div>
    )
}

export default StageList