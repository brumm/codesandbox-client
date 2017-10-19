import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import CrossIcon from 'react-icons/lib/md/clear';
import NotSyncedIcon from 'react-icons/lib/go/primitive-dot';

class Hoverable extends React.Component {
  state = { isOver: false };
  render() {
    const { children, ...props } = this.props;
    return (
      <div
        {...props}
        onMouseEnter={() => this.setState({ isOver: true })}
        onMouseLeave={() => this.setState({ isOver: false })}
      >
        {children(this.state.isOver)}
      </div>
    );
  }
}

const Container = styled.div`
  display: flex;
  background-color: #191b1d;
  color: ${props => props.theme.white};
  height: 3rem;
  flex: 0 0 3rem;
  box-sizing: border-box;
  align-items: center;
  border-bottom: 1px solid #121516;
`;

const PADDING = '1.5rem';

const Tab = styled(Hoverable)`
  display: flex;
  padding: 0 calc(${PADDING} / 2) 0 ${PADDING};
  box-sizing: border-box;
  align-items: center;
  position: relative;
  height: 100%;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#1D2022' : '#191b1d')};
  box-shadow: ${({ active }) => (active ? '0 1px 0 #1D2022' : 'none')};
  border-right: 1px solid #121516;
  &:hover {
    background-color: #1d2022;
  }
`;

const Title = styled.div`
  margin-right: auto;
  padding-right: calc(${PADDING} / 2);
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.3rem;
  color: ${props => props.theme.templateColor || props.theme.secondary};
`;

const Tabbar = ({ modules, onSelect, onRemove }) => {
  const isCloseable = modules.length > 1;
  return (
    <Container>
      {modules.map(({ id, title, active, isNotSynced }, index) => (
        <Tab key={id} active={active} onClick={() => onSelect(id)}>
          {isOver => (
            <div>
              <Title>{title}</Title>

              <IconContainer>
                {isNotSynced && (!isCloseable || !isOver) && <NotSyncedIcon />}
                {isCloseable &&
                  isOver && (
                    <CrossIcon
                      onClick={e => {
                        e.stopPropagation();
                        const nextTab =
                          index === 0
                            ? modules[index + 1].id
                            : modules[index - 1].id;
                        onRemove(id);
                        onSelect(nextTab);
                      }}
                    />
                  )}
              </IconContainer>
            </div>
          )}
        </Tab>
      ))}
    </Container>
  );
};

export default Tabbar;
