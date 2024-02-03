import { TScreen } from "@/types/screen";

// screenshots
import Screen1 from "public/assets/image/screen_1.png";
import Screen2 from "public/assets/image/screen_2.png";
import Screen3 from "public/assets/image/screen_3.png";

export const mock_screen: TScreen[] = [
  {
    title: `Все фильмы вашем TV`,
    description: `Вас ждет более 1000 фильмов, сериалов,мультфильмов разного жанры и многое другое без ограничений`,
    screenshot: Screen1,
  },
  {
    title: `Смотрите что угодно`,
    description: `Смотрите что угодго, где угодно по однойдоступной выгодной цене для себя`,
    screenshot: Screen2,
  },
  {
    title: `Любимые просмотры`,
    description: `Вы можете сохранить ваши любимые просмотры, чтобы посомтреть позже`,
    screenshot: Screen3,
  },
];
