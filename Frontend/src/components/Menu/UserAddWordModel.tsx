import React, { ChangeEvent } from "react";
import { isWordExist } from '../../helpers/connector';
import { TextField } from "@mui/material";
import "./Menu.css";

interface UserAddWordModelProps {
  onClose: () => void
}

interface UserAddWordModelState {
  searchingWord: string,
  typedWord: string,
  wordExist: boolean,
}

class UserAddWordModel extends React.Component<UserAddWordModelProps, UserAddWordModelState> {
  constructor(props: UserAddWordModelProps) {
    super(props);
    this.state = {
      searchingWord: "",
      typedWord: "",
      wordExist: false
    };
  }

  handleSearchValueChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputString = event.target.value;
    this.setState({
      searchingWord: inputString,
    });
    await this.checkWordExistence(inputString);
  }

  checkWordExistence = async (inputWord: string) => {
    const exist = await isWordExist(inputWord);
    this.setState({
      wordExist: exist,
    });
  }

  render() {
    const { onClose } = this.props;
    const { searchingWord, typedWord, wordExist } = this.state;

    return (
      <div className="addWordModelPopup">
        <button className="fbClose-btn" onClick={onClose}>
          X
        </button>
        <div className="searchWord">
          <TextField
            label={`Search word online: `}
            value={searchingWord}
            onChange={this.handleSearchValueChange}
          />
        </div>
        <div className="typedWord">
          {typedWord.toUpperCase()}
        </div>
        {searchingWord && (
          <div className="typedWord">
            {wordExist ? "The word already exists in our database" : "The word does not exist in our database"}
          </div>
        )}
        {/* <button type="submit" className="fbSubmitButton">Submit</button> */}
      </div>
    );
  }
}

export default UserAddWordModel;
