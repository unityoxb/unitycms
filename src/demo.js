import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";

function PostList () {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([])
    const [error, setError] = useState('')
    // 文章总数
    const [count, setCount] = useState(0)
    // 总页码
    const [numPages, setNumPages] = useState(1)
    // 默认显示第一页
    const [page, setPage] = useState(1)

    useEffect(() => {
        axios.get(`/api/v1/stories/?page=${page}`)
            .then(response => {
                setLoading(false)
                setPosts(response.data.results)
                setCount(response.data.count)
                setNumPages(response.data.num_pages)
                setError('')
            })
            .catch(err => {
                setLoading(false)
                setPosts([])
                setCount(0)
                setNumPages(1)
                setError('很抱歉，您要访问的页面不存在！')
            })
    }, [page])


    //三种情形： 1）正在加载
    //         2) 不再加载也没有错误
    //         3）不再加载但有错误
    return (
        <>
            {loading && <div className="text-center">
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">正在加载...</span>
                </div>
            </div>
            }

            {!loading && !error && (
                <main className="container" style={{ marginTop: "5rem" }}>
                    <div className="row justify-content-center">

                        <div className="col-md-8">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="row justify-content-between">
                                        <p className="col-4 text-muted font-weight-light post-count"
                                            style={{ letterSpacing: "0.05em" }}>
                                            共{count}篇
                                        </p>
                                    </div>
                                </div>
                            </div>

                  

                            <nav className="blog-pagination d-flex justify-content-between page-nav">

                                {page >> 1 ? (
                                    <Link className="ml-3 text-decoration-none mr-auto" to="#"
                                        onClick={() => setPage(page - 1)}
                                        data-toggle="tooltip" data-placement="left" title="上一页">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16"
                                            className="bi bi-chevron-double-left" fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                            <path fill-rule="evenodd"
                                                d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                        </svg>
                                        上一页
                                    </Link>
                                ) : null}

                                {page < numPages ? (
                                    <Link className="mr-3 text-decoration-none ml-auto" to="#" tabIndex="-1"
                                        onClick={() => setPage(page + 1)} data-toggle="tooltip" data-placement="right"
                                        title="下一页">
                                        下一页
                                        <svg width="1em" height="1em" viewBox="0 0 16 16"
                                            className="bi bi-chevron-double-right" fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" />
                                            <path fillRule="evenodd"
                                                d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </Link>
                                ) : null}

                            </nav>

                        </div>
                    </div>
                </main>
            )}

            {!loading && error && (
                <div className="text-danger" role="alert">
                    {error}
                </div>
            )}
        </>
    );
};

export default PostList;