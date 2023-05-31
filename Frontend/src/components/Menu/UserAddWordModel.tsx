import React, { ChangeEvent } from "react";
import { isWordExist } from '../../helpers/connector';
import { TextField } from "@mui/material";
import "./Menu.css";

interface UserAddWordModelProps {
    onClose: () => void,
    onSubmit: (word: string) => void,
}

interface UserAddWordModelState {
    wordExist: boolean,
    word: string,
    errMessage: string
}

class UserAddWordModel extends React.Component<UserAddWordModelProps, UserAddWordModelState> {
  constructor(props: UserAddWordModelProps) {
    super(props);
    this.state = {
      wordExist: false,
      word: "",
      errMessage: "",
    };
  }

  handleSearchValueChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputString = event.target.value;
    const isValid = /^[a-zA-Z'-]*$/.test(inputString);
    if (
      inputString.startsWith('-') || 
      inputString.startsWith('\''))
    {
        this.setState({ 
            errMessage: 'Apostrophes and/or hyphens cannot be used in the beginning of a word.' 
        });
    } 
    else if (
      inputString.endsWith('\'') || 
      inputString.endsWith('-'))
      {
        this.setState({ 
          errMessage: 'Apostrophes and/or hyphens cannot be used in the ending of a word.' 
        });
      }
    else if (isValid) {
        this.setState({
            word: inputString,
            errMessage: ""
        });
    } 
    else {
      this.setState({ errMessage: 'Special character(s) or number(s) are not accepted (except apostrophes, hyphens).' })
    }
    await this.checkWordExistence(inputString);
  }

  checkWordExistence = async (inputWord: string) => {
    const exist = await isWordExist(inputWord);
    this.setState({
      wordExist: exist,
    });
  }

  render() {
    const { onClose, onSubmit } = this.props;
    const { wordExist, word, errMessage } = this.state;

    return (
      <div className="addWordModelPopup">
        <button className="fbClose-btn" onClick={onClose}>
          X
        </button>

        <form onSubmit={(event) => {event.preventDefault(); onSubmit(word);}}>
            <div className="searchWord">
              <TextField
                  label={`Search word online: `}
                  value={word}
                  onChange={this.handleSearchValueChange}
              />
            </div>
            <div className="typedWord">
              {errMessage}
            </div>
            {word && (
              <div className="typedWord">
                  {wordExist ? "The word already exists in our database" : "The word does not exist in our database"}
              </div>
            )}

            <button type="submit" className="userAddWordModelSubmit">Submit</button>
        </form>
      </div>
    );
  }
}

export default UserAddWordModel;
