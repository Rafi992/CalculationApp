import { FC, MouseEventHandler } from "react";
import { useThemeContext } from "../../context/theme.context";
import { BackspaceIcon } from "@heroicons/react/24/outline";

interface PropsType {
  content: string;
  action?: string;
  color?: string;
  full?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon?: string;
}

const Btn: FC<PropsType> = ({
  content,
  color,
  onClick,
  full,
  icon,
}: PropsType) => {
  const { darkMode } = useThemeContext();

  return (
    <button
      onClick={onClick}
      className={`${
        darkMode ? "neu-small--dark" : "neu-small--white"
      } w-10 h-10 neu__btn  flex justify-center items-center  cursor-pointer rounded-md  font-semibold mx-auto mb-2`}
      style={full ? { width: "100%" } : {}}
    >
      {icon ? (
        content === "<" ? (
          <BackspaceIcon width={25} height={25} />
        ) : (
          <BackspaceIcon width={25} height={25} />
        )
      ) : (
        <span
          className='inline-block w-full'
          style={color ? { color: "#" + color } : {}}
        >
          {content}
        </span>
      )}
    </button>
  );
};

export default Btn;
