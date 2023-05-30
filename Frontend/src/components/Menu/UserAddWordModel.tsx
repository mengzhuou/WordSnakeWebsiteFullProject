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

  handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputString = event.target.value;

    this.setState({
      searchingWord: inputString,
    });
  }

  handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {

      this.storeSearchValue(this.state.searchingWord).then(() => {
        this.setState({ searchingWord: ""});
      });
    }
  }

  storeSearchValue = async (inputValue: string) => {
    const exist = await isWordExist(inputValue);

    this.setState({ searchingWord: inputValue, typedWord: inputValue, wordExist: exist })
  }

//   handleAddWordModelSubmit = () => {
//     onSubmit();
//   }

  render() {
    const { onClose } = this.props;
    const { searchingWord, typedWord, wordExist } = this.state;

    return (
    //   <Draggable>
        <div className="addWordModelPopup">
            <button className="fbClose-btn" onClick={onClose}>
                X
            </button>
            <div className="searchWord">
              <TextField
                label={`Search word online: `}
                value={searchingWord}
                onChange={this.handleSearchValueChange}
                onKeyDown={this.handleEnterKeyDown}
              />
            </div>
            <div className="typedWord">
                {typedWord.toUpperCase()}
            </div>
            <div className="typedWord">
                {wordExist? 
                    "The word already exist in our database"
                    :
                    "The word does not exist in our database"
                }
            </div>
            {/* <button type="submit" className="fbSubmitButton">Submit</button> */}
        </div>
    );
  }
}

export default UserAddWordModel;
