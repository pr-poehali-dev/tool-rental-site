import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { format, differenceInDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import { toast } from 'sonner';

const tools = [
  {
    id: 1,
    name: 'Перфоратор Bosch',
    category: 'Электроинструменты',
    price: 500,
    image: 'https://cdn.poehali.dev/projects/bbbba6b3-1e07-4b6b-b69e-859e264b36f7/files/8b2fdedd-65f7-4aa7-b2c5-fbf447837e61.jpg',
    description: 'Мощный перфоратор для бетона и кирпича',
    available: true
  },
  {
    id: 2,
    name: 'Шуруповёрт Makita',
    category: 'Электроинструменты',
    price: 350,
    image: 'https://cdn.poehali.dev/projects/bbbba6b3-1e07-4b6b-b69e-859e264b36f7/files/636d77bb-a19f-4a43-b01b-114052166d82.jpg',
    description: 'Аккумуляторный шуруповёрт 18V',
    available: true
  },
  {
    id: 3,
    name: 'Болгарка DeWalt',
    category: 'Электроинструменты',
    price: 400,
    image: 'https://cdn.poehali.dev/projects/bbbba6b3-1e07-4b6b-b69e-859e264b36f7/files/5dc9447f-7ba2-4a21-ab26-209cb881249b.jpg',
    description: 'Угловая шлифовальная машина 125мм',
    available: true
  },
  {
    id: 4,
    name: 'Бетономешалка',
    category: 'Строительное оборудование',
    price: 800,
    image: '/placeholder.svg',
    description: 'Бетономешалка 180л',
    available: false
  },
  {
    id: 5,
    name: 'Лестница алюминиевая',
    category: 'Оборудование',
    price: 250,
    image: '/placeholder.svg',
    description: 'Стремянка 6 ступеней',
    available: true
  },
  {
    id: 6,
    name: 'Генератор бензиновый',
    category: 'Энергооборудование',
    price: 1200,
    image: '/placeholder.svg',
    description: 'Генератор 3кВт',
    available: true
  }
];

const categories = ['Все', 'Электроинструменты', 'Строительное оборудование', 'Оборудование', 'Энергооборудование'];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedTool, setSelectedTool] = useState<typeof tools[0] | null>(null);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const filteredTools = selectedCategory === 'Все' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const calculateTotal = () => {
    if (!dateFrom || !dateTo || !selectedTool) return 0;
    const days = differenceInDays(dateTo, dateFrom) + 1;
    return days * selectedTool.price;
  };

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');
    
    if (!dateFrom || !dateTo) {
      toast.error('Выберите даты аренды');
      return;
    }

    toast.success(`Заявка отправлена! Мы свяжемся с вами по телефону ${phone}`);
    setIsBookingOpen(false);
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted/20">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Wrench" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-foreground">ИнструментПрокат</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
              <Button size="sm">
                <Icon name="Phone" size={16} className="mr-2" />
                Позвонить
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Аренда инструмента
            <span className="block text-primary mt-2">для любых задач</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Профессиональное оборудование без покупки. Бронируйте онлайн за минуту.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="text-lg" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="Search" size={20} className="mr-2" />
              Смотреть каталог
            </Button>
            <Button size="lg" variant="outline" className="text-lg" onClick={() => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow animate-scale-in">
              <Icon name="Clock" className="mx-auto text-primary mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Быстрая аренда</h3>
              <p className="text-muted-foreground">Онлайн-бронирование за 2 минуты</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <Icon name="Shield" className="mx-auto text-primary mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Надёжность</h3>
              <p className="text-muted-foreground">Проверенный инструмент в отличном состоянии</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <Icon name="Wallet" className="mx-auto text-primary mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Выгодно</h3>
              <p className="text-muted-foreground">Дешевле покупки нового оборудования</p>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Каталог инструментов</h2>
          
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-transparent">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <Card 
                key={tool.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <img src={tool.image} alt={tool.name} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl">{tool.name}</CardTitle>
                    {tool.available ? (
                      <Badge variant="default" className="bg-green-500">Доступен</Badge>
                    ) : (
                      <Badge variant="secondary">Занят</Badge>
                    )}
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">{tool.price} ₽</span>
                    <span className="text-muted-foreground">/сутки</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog open={isBookingOpen && selectedTool?.id === tool.id} onOpenChange={(open) => {
                    setIsBookingOpen(open);
                    if (open) setSelectedTool(tool);
                  }}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        disabled={!tool.available}
                        onClick={() => setSelectedTool(tool)}
                      >
                        <Icon name="Calendar" size={16} className="mr-2" />
                        Забронировать
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Бронирование: {tool.name}</DialogTitle>
                        <DialogDescription>Выберите даты аренды и заполните контактные данные</DialogDescription>
                      </DialogHeader>
                      
                      <form onSubmit={handleBooking} className="space-y-6 mt-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Дата начала аренды</Label>
                            <Calendar
                              mode="single"
                              selected={dateFrom}
                              onSelect={setDateFrom}
                              disabled={(date) => date < new Date()}
                              locale={ru}
                              className="rounded-md border"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Дата окончания аренды</Label>
                            <Calendar
                              mode="single"
                              selected={dateTo}
                              onSelect={setDateTo}
                              disabled={(date) => !dateFrom || date < dateFrom}
                              locale={ru}
                              className="rounded-md border"
                            />
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Ваше имя</Label>
                            <Input id="name" name="name" placeholder="Иван Иванов" required />
                          </div>
                          <div>
                            <Label htmlFor="phone">Телефон</Label>
                            <Input id="phone" name="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                          </div>
                        </div>

                        <Separator />

                        <div className="bg-muted p-4 rounded-lg space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Инструмент:</span>
                            <span className="font-medium">{tool.name}</span>
                          </div>
                          {dateFrom && dateTo && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Период:</span>
                                <span className="font-medium">
                                  {format(dateFrom, 'd MMM', { locale: ru })} - {format(dateTo, 'd MMM', { locale: ru })}
                                  {' '}({differenceInDays(dateTo, dateFrom) + 1} дн.)
                                </span>
                              </div>
                              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                <span>Итого:</span>
                                <span className="text-primary">{calculateTotal()} ₽</span>
                              </div>
                            </>
                          )}
                        </div>

                        <Button type="submit" className="w-full" size="lg">
                          <Icon name="CheckCircle" size={20} className="mr-2" />
                          Отправить заявку
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Контакты</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Свяжитесь с нами</CardTitle>
                <CardDescription>Ответим на любые вопросы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" className="text-primary" size={24} />
                  <div>
                    <p className="font-medium">Телефон</p>
                    <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="text-primary" size={24} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">info@instrumentprokat.ru</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" className="text-primary" size={24} />
                  <div>
                    <p className="font-medium">Адрес</p>
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Clock" className="text-primary" size={24} />
                  <div>
                    <p className="font-medium">Режим работы</p>
                    <p className="text-muted-foreground">Пн-Пт: 9:00 - 20:00<br />Сб-Вс: 10:00 - 18:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Напишите нам</CardTitle>
                <CardDescription>Оставьте сообщение и мы перезвоним</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
                  e.currentTarget.reset();
                }} className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Имя</Label>
                    <Input id="contact-name" placeholder="Ваше имя" required />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Телефон</Label>
                    <Input id="contact-phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                  </div>
                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Input id="message" placeholder="Ваш вопрос" />
                  </div>
                  <Button type="submit" className="w-full">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Wrench" size={24} />
            <span className="text-xl font-bold">ИнструментПрокат</span>
          </div>
          <p className="text-white/70">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}