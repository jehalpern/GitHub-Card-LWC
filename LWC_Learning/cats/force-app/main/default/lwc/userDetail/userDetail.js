import { LightningElement, wire } from 'lwc';
import getUserDetail from '@salesforce/apex/AccountController.getUserDetail'
const git_url = 'https://api.github.com/users/'

export default class UserDetail extends LightningElement {

    selectedUser
    GitHubUsername
    gitFollowers
    gitProfile
    gitStart
    queryValue
    gitTitle= "<>__GitHub__</>"

    //handle input field and submit button
    getData(event){
        this.queryValue = event.target.value
    }
    clickHandler(){
        this.selectedUser = this.queryValue
    }

    //query SF DB and return the user's GitHub Username, then trigger github API callout
    @wire(getUserDetail, {selectedUser:'$selectedUser'})
    userDetail({data, error}){
        if (data){
            console.log(data)
            this.GitHubUsername = data[0].github_username__c
            console.log('Username:' +this.GitHubUsername )
            this.fetchGit()
        }
        if(error){
            console.error(error)
        }
    }

    //GitHub API callout
    fetchGit(){
        fetch(git_url + this.GitHubUsername)
        .then(response => response.json())
        .then(data =>{
            this.gitFollowers = data.followers
            this.gitProfile = data.avatar_url
            this.gitStart = data.created_at
            })
        .catch(error => console.error(error))
    }
}
