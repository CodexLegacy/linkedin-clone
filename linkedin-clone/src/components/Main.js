import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import PostModal from './PostModal';
import { getArticlesAPI } from '../actions';

const Main = (props) => {
  const [showModal, setShowModal] = useState('close');

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case 'open':
        setShowModal('close');
        break;
      case 'close':
        setShowModal('open');
        break;
      default:
        setShowModal('close');
        break;
    }
  };

  return (
    <>
      {props.articles.length === 0 ? (
        <p
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: '80px',
            fontSize: '30px',
          }}
        >
          There are no Articles
        </p>
      ) : (
        <Container>
          <ShareBox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt='user-img' />
              ) : (
                <img src='/images/user.svg' alt='User' />
              )}

              <button
                onClick={handleClick}
                disabled={props.loading ? true : false}
              >
                Start a post
              </button>
            </div>
            <div>
              <button>
                <img className='icons' src='/images/photo-icon.svg' alt='img' />
                <span>Photo</span>
              </button>
              <button>
                <img
                  className='icons'
                  src='/images/video-icon.svg'
                  alt='video-icon'
                />
                <span>Video</span>
              </button>
              <button>
                <img
                  className='icons'
                  src='/images/event-icon.svg'
                  alt='event-icon'
                />
                <span>Event</span>
              </button>
              <button>
                <img
                  className='icons'
                  src='/images/article-icon.svg'
                  alt='article-icon'
                />
                <span>Write article</span>
              </button>
            </div>
          </ShareBox>
          <Content>
            {props.loading && (
              <img src='/images/spinner-icon.svg' alt='spinner-img' />
            )}

            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt='img' />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src='/images/ellipsis-icon.svg' alt='img' />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a>
                      {!article.sharedImg && article.video ? (
                        <ReactPlayer width={'100%'} url={article.video} />
                      ) : (
                        article.sharedImg && <img src={article.sharedImg} />
                      )}
                    </a>
                  </SharedImg>
                  <SocialCount>
                    <li>
                      <button>
                        <img
                          src='https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb'
                          alt='like-icon'
                        />
                        <img
                          src='https://static-exp1.licdn.com/sc/h/jbbw3jbilcm53nvxebxd01gh'
                          alt='interest-icon'
                        />
                        <img
                          src='https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97'
                          alt='empathy-icon'
                        />
                        <span>108</span>
                      </button>
                    </li>
                    <li>
                      <a>{article.comments}</a>
                    </li>
                  </SocialCount>
                  <SocialIcons>
                    <button>
                      <img src='images/like-icon.svg' alt='like-icon' />
                      <span>Like</span>
                    </button>

                    <button>
                      <img src='images/comment-icon.svg' alt='comment-icon' />
                      <span>Comment</span>
                    </button>

                    <button>
                      <img src='images/share-icon.svg' alt='share-icon' />
                      <span>Share</span>
                    </button>

                    <button>
                      <img src='images/send-icon.svg' alt='send-icon' />
                      <span>Send</span>
                    </button>
                  </SocialIcons>
                </Article>
              ))}
          </Content>
          <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      cursor: pointer;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;

      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }

      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 6px 0 -2px;
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.08);
          border-radius: 4px;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;

  a {
    margin-right: 12px;
    flex-grow: 1;
    align-items: center;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;

      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 8px;
    background: transparent;
    border: none;
    outline: none;
    padding: 3px 3px;
    cursor: pointer;
    border-radius: 50%;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    img {
      margin-top: 3px;
    }
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;

  border-bottom: 1px solid #e9e5df;
  list-style: none;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 200;

    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 16px;
    font-weight: 200;
    margin-right: 3px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      width: 100%;
      background: transparent;
      outline: none;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 16px;

        color: rgba(0, 0, 0, 0.5);
        font-weight: 200;
        margin-right: 3px;
      }

      a {
        font-size: 16px;
        font-weight: 200;
      }

      img {
        margin-right: 5px;
      }
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  button {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    padding: 12px 8px;
    color: #666666;
    font-weight: 500;
    font-size: 16px;
    margin-right: 2px;
    border: none;
    background: transparent;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
      border-radius: 4px;
    }

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
