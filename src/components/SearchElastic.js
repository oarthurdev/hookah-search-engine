import { useEffect, useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const ElasticSearch = ({ searchTerm }) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const searchDocuments = async () => {
          try {
            const ELASTIC_SEARCH_URL = process.env.REACT_APP_ELASTIC_SEARCH_URL;
            const SEARCH_INDEX_NAME = process.env.REACT_APP_SEARCH_INDEX_NAME;
            const USERNAME = process.env.REACT_APP_ELASTIC_USERNAME;
            const PASSWORD = process.env.REACT_APP_ELASTIC_PASSWORD;
        
            const axiosInstance = axios.create({
            baseURL: ELASTIC_SEARCH_URL,
            auth: {
                username: USERNAME,
                password: PASSWORD,
            },
            });
    
            const response = await axiosInstance.get(`${ELASTIC_SEARCH_URL}/${SEARCH_INDEX_NAME}/_search`, {
              params: {
                q: searchTerm,
              },
            });
    
            const hits = response.data.hits.hits;
            const formattedResults = hits.map((hit) => ({
              id: hit._id,
              title: hit._source.name,
              description: hit._source.description,
              link: hit._source.link,
              image: hit._source.image,
              date: hit._source.date,
              author: hit._source.author,
            }));
    
            setResults(formattedResults);
          } catch (error) {
            console.error('Error searching documents:', error);
          }
        };
    
        if (searchTerm.trim() !== '') {
          searchDocuments();
        }
      }, [searchTerm]);
    
      return results;
};

export default ElasticSearch;