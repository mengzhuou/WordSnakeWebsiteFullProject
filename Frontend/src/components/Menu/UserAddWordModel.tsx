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
    word: string
}

class UserAddWordModel extends React.Component<UserAddWordModelProps, UserAddWordModelState> {
  constructor(props: UserAddWordModelProps) {
    super(props);
    this.state = {
      wordExist: false,
      word: "",
    };
  }

  handleSearchValueChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputString = event.target.value;
    this.setState({
      word: inputString,
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
    const { onClose, onSubmit } = this.props;
    const { wordExist, word } = this.state;

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
