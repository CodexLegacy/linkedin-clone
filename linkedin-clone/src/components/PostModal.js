import styled from 'styled-components';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { postArticleAPI } from '../actions';

const PostModal = (props) => {
  const [editorText, setEditorText] = useState('');
  const [shareImage, setShareImage] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [assetArea, setAssetArea] = useState('');

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === '' || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }

    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage('');
    setVideoLink('');
    setAssetArea(area);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };

    props.postArticle(payload);
    reset(e);
  };

  const reset = (e) => {
    setEditorText('');
    setShareImage('');
    setVideoLink('');
    setAssetArea('');
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === 'open' ? (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>

              <button onClick={(event) => reset(event)}>
                <img src='/images/close-icon.svg' alt='Close' />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} alt='user-img' />
                ) : (
                  <img src='/images/user.svg' alt='User' />
                )}
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder='What do you want to talk about?'
                  autoFocus='none'
                />
                {assetArea === 'image' ? (
                  <UploadImage>
                    <input
                      type='file'
                      accept='image/gif, image/jpeg, image/png'
                      name='image'
                      id='file'
                      style={{ display: 'none' }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor='file'>Select an image to share</label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} alt='img' />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === 'media' && (
                    <>
                      <input
                        type='text'
                        placeholder='Please input a video link'
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width='100%' url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <SharedCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea('image')}>
                  <ButtonMeaning>
                    <span style={{ width: '70px' }}>Add a photo</span>
                  </ButtonMeaning>
                  <img src='/images/photos-icon.svg' alt='img' />
                </AssetButton>

                <AssetButton onClick={() => switchAssetArea('media')}>
                  <ButtonMeaning>
                    <span style={{ width: '70px' }}>Add a video</span>
                  </ButtonMeaning>
                  <img src='/images/videos-icon.svg' alt='img' />
                </AssetButton>

                <AssetButton>
                  <ButtonMeaning>
                    <span style={{ width: '100px' }}>Add a document</span>
                  </ButtonMeaning>
                  <img src='/images/document-icon.svg' alt='img' />
                </AssetButton>
                <AssetButton>
                  <ButtonMeaning>
                    <span style={{ width: '130px' }}>
                      Share that you're hiring
                    </span>
                  </ButtonMeaning>
                  <img src='/images/hiring-icon.svg' alt='img' />
                </AssetButton>
                <AssetButton>
                  <ButtonMeaning>
                    <span style={{ width: '120px' }}>
                      Celebrate an occasion
                    </span>
                  </ButtonMeaning>
                  <img src='/images/occasion-icon.svg' alt='img' />
                </AssetButton>
                <AssetButton>
                  <ButtonMeaning>
                    <span style={{ width: '70px' }}>Create a poll</span>
                  </ButtonMeaning>
                  <img src='/images/poll-icon.svg' alt='img' />
                </AssetButton>
                <AssetButton>
                  <ButtonMeaning>
                    <span style={{ width: '90px' }}>Add to your post</span>
                  </ButtonMeaning>
                  <img src='/images/ellipsis-post-icon.svg' alt='img' />
                </AssetButton>
              </AttachAssets>

              <ShareComment>
                <Button>
                  <div></div>
                </Button>
                <Public>
                  <Button>
                    <img src='/images/anyone-message-icon.svg' alt='img' />
                    <span>Anyone</span>
                  </Button>
                </Public>
              </ShareComment>

              <PostButton
                disabled={!editorText ? true : false}
                onClick={(e) => postArticle(e)}
              >
                Post
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      ) : null}
      ;
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.6);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    background-color: transparent;
    color: rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    border: none;
    transition-duration: background-color 167ms;
    cursor: pointer;

    svg,
    img {
      pointer-events: none;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;

  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }

  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;
const ButtonMeaning = styled.div`
  position: absolute;
  left: -30px;
  bottom: 50px;
  padding: 10px 5px;
  border-radius: 5px;
  text-align: center;
  font-size: 10px;
  visibility: hidden;
  background-color: rgba(235, 235, 235, 9);

  span {
    display: inline-block;
    z-index: 999;
    padding: 0;
  }
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  border: none;
  background-color: transparent;
  border-radius: 50%;
  position: relative;

  &:hover {
    ${ButtonMeaning} {
      visibility: visible;
    }

    img {
      margin: auto;
    }
  }

  &:not(:nth-child(8))&:hover {
    background-color: rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;

  ${AssetButton} {
    width: 40px;
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  div {
    border-left: 1px solid rgba(0, 0, 0, 0.3);
    height: 35px;
    margin-right: 15px;
    background-color: transparent;
  }
  img {
    margin-right: 3px;
  }
`;

const Public = styled.div`
  display: flex;
  margin-top: 5px;
  margin-right: 10px;
  border-radius: 25px;
  border: none;
  width: 100px;
  height: 20px;
  padding: 5px 5px;
  transition: background-color 167ms ease;
  cursor: pointer;

  ${Button} {
    margin: auto;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const ShareComment = styled.div`
  display: flex;
  margin-right: auto;

  Span {
    color: #666666;
    font-weight: 500;
    font-size: 17px;
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding: 0px 16px;
  height: 30px;
  margin-top: 6px;
  margin-right: 30px;
  font-size: 16px;
  font-weight: 500;
  background: ${(props) => (props.disabled ? 'rgb(235,235,235)' : '#0a66c2')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.disabled ? 'rgba(102,102,102,0.5)' : 'white')};
  border: none;

  &:hover {
    background: ${(props) => (props.disabled ? 'rgba(0,0,0,0.2)' : '#004182')};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    border: none;
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;

  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
