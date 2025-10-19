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
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '' });

  const filteredTools = selectedCategory === 'Все' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const calculateTotal = () => {
    if (!dateRange.from || !dateRange.to || !selectedTool) return 0;
    const days = differenceInDays(dateRange.to, dateRange.from) + 1;
    return days * selectedTool.price;
  };

  const handleBooking = () => {
    if (!selectedTool || !dateRange.from || !dateRange.to || !contactForm.name || !contactForm.phone) {
      toast.error('Заполните все обязательные поля');
      return;
    }
    
    toast.success(`Заявка на ${selectedTool.name} отправлена! Мы свяжемся с вами в ближайшее время.`);
    setSelectedTool(null);
    setDateRange({ from: undefined, to: undefined });
    setContactForm({ name: '', phone: '', email: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Wrench" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-foreground">ИнструментПрокат</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">О нас</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
            </nav>
            <Button variant="default" size="lg">
              <Icon name="Phone" size={18} className="mr-2" />
              +7 (999) 123-45-67
            </Button>
          </div>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl font-bold mb-6 text-foreground">
              Аренда профессионального инструмента
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Более 100 единиц строительного и садового оборудования. 
              Доставка, техподдержка, выгодные цены.
            </p>
            <Button size="lg" className="text-lg px-8">
              Выбрать инструмент
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-muted-foreground">Доставим инструмент в течение 2 часов</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ShieldCheck" className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-muted-foreground">Весь инструмент проверен и исправен</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Wallet" className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Выгодные цены</h3>
              <p className="text-muted-foreground">Скидки при долгосрочной аренде</p>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Каталог инструментов</h2>
          
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="p-0">
                  <div className="h-48 overflow-hidden rounded-t-lg bg-muted">
                    <img 
                      src={tool.image} 
                      alt={tool.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{tool.name}</CardTitle>
                    {tool.available ? (
                      <Badge variant="default" className="bg-green-500">Доступно</Badge>
                    ) : (
                      <Badge variant="secondary">Занято</Badge>
                    )}
                  </div>
                  <CardDescription className="mb-4">{tool.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">{tool.price} ₽</p>
                      <p className="text-sm text-muted-foreground">за сутки</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          disabled={!tool.available}
                          onClick={() => setSelectedTool(tool)}
                        >
                          Забронировать
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Бронирование: {tool.name}</DialogTitle>
                          <DialogDescription>
                            Выберите даты аренды и заполните контактную информацию
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          <div>
                            <Label className="mb-2 block">Период аренды</Label>
                            <div className="border rounded-lg p-4">
                              <Calendar
                                mode="range"
                                selected={dateRange}
                                onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
                                numberOfMonths={2}
                                locale={ru}
                                disabled={(date) => date < new Date()}
                                className="mx-auto"
                              />
                            </div>
                            {dateRange.from && dateRange.to && (
                              <p className="text-sm text-muted-foreground mt-2">
                                {format(dateRange.from, 'dd MMMM', { locale: ru })} - {format(dateRange.to, 'dd MMMM yyyy', { locale: ru })}
                                {' '}({differenceInDays(dateRange.to, dateRange.from) + 1} {differenceInDays(dateRange.to, dateRange.from) + 1 === 1 ? 'день' : 'дней'})
                              </p>
                            )}
                          </div>

                          <Separator />

                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="name">Имя *</Label>
                              <Input 
                                id="name" 
                                placeholder="Ваше имя"
                                value={contactForm.name}
                                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone">Телефон *</Label>
                              <Input 
                                id="phone" 
                                type="tel"
                                placeholder="+7 (999) 123-45-67"
                                value={contactForm.phone}
                                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input 
                                id="email" 
                                type="email"
                                placeholder="example@mail.ru"
                                value={contactForm.email}
                                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                              />
                            </div>
                          </div>

                          {dateRange.from && dateRange.to && (
                            <>
                              <Separator />
                              <div className="bg-muted p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-muted-foreground">Стоимость за сутки:</span>
                                  <span className="font-semibold">{tool.price} ₽</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-muted-foreground">Количество дней:</span>
                                  <span className="font-semibold">{differenceInDays(dateRange.to, dateRange.from) + 1}</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between items-center">
                                  <span className="text-lg font-bold">Итого:</span>
                                  <span className="text-2xl font-bold text-primary">{calculateTotal()} ₽</span>
                                </div>
                              </div>
                            </>
                          )}

                          <Button className="w-full" size="lg" onClick={handleBooking}>
                            Отправить заявку
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Свяжитесь с нами</CardTitle>
                <CardDescription>Мы работаем ежедневно с 8:00 до 22:00</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" className="text-primary" size={20} />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="text-primary" size={20} />
                  <span>info@instrumentprokat.ru</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" className="text-primary" size={20} />
                  <span>г. Москва, ул. Строительная, д. 15</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Напишите нам</CardTitle>
                <CardDescription>Ответим в течение 15 минут</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  toast.success('Сообщение отправлено!');
                }}>
                  <Input placeholder="Ваше имя" />
                  <Input type="tel" placeholder="Телефон" />
                  <Input placeholder="Сообщение" />
                  <Button type="submit" className="w-full">Отправить</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 ИнструментПрокат. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
