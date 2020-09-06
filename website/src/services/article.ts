import axios from "axios";

export class ArticleService {

    private endpoint: string

    constructor() {
        this.endpoint = 'http://localhost:8100'
    }

    getAllArticles = async () => {
        return axios.get(`${this.endpoint}/article`)
        .then(
            (r) => {
                return r.data['Articles'];
            }
        ) .catch(err => console.log(err))
    }

    getArticle = async (articleId: number) => {
        return axios.get(`${this.endpoint}/article/${articleId}`)
        .then(
            (r) => {
                return r.data;
            }
        ) .catch(err => console.log(err))
    }
}

export default new ArticleService();