import { gql } from 'apollo-boost';


const highScoresQuery =gql`
  	{
        highScores {
            username
            score
        }
    }
`;

const signUpMutation = gql`
    mutation($username: String!, $firstName:String! , $lastName:String! , $password: String!){
        createUser(username: $username, firstName: $firstName, lastName: $lastName, password: $password) {
            username
        }
    }
`;

const fbLoginMutation = gql`
    mutation($username: String!, $firstName:String! , $lastName:String! , $password: String!){
        fbLogin(username: $username, firstName: $firstName, lastName: $lastName, password: $password) {
            username
        }
    }
`;
const loginMutation = gql`
    mutation($username: String!, $password: String!){
        login(username: $username, password: $password) {
            username
        }
    }
`;


const logoutMutation = gql`
    mutation($username: String!){
        logout(username: $username) {
            username
        }
    }
`;

const notiCheck = gql`
    query($username: String!) {
        getNotification(username: $username) {
            hasNotification
            message
        }
    }
`;


const setScoreMutation = gql`
    mutation($username: String!,$score: Int! ){
        setUserHighScore(username: $username,score: $score) {
            username
        }
    }
`;
const saveSubscription = gql`
    mutation($username: String!, $subscription: String!) {
        saveSub(username: $username, subscription: $subscription) {

            username
        }
    }
`;


export { signUpMutation,loginMutation,logoutMutation,setScoreMutation, highScoresQuery,notiCheck,saveSubscription,fbLoginMutation};

