# Как добавить свои домены

Есть два способа добавить домены на ваш marketplace:

## Способ 1: Быстрое добавление через _data/domains.yml (для главной страницы)

Этот способ подходит для быстрого добавления доменов, которые будут отображаться на главной странице в виде карточек.

### Шаги:

1. Откройте файл `_data/domains.yml`
2. Добавьте свои домены в следующем формате:

```yaml
- name: вашдомен.com
  price: 9999
  description: Краткое описание домена (1-2 предложения)
  category: Категория
  featured: true  # или false
```

### Пример:

```yaml
- name: cryptoexchange.io
  price: 25000
  description: Perfect for cryptocurrency exchange platforms and blockchain trading services
  category: Cryptocurrency
  featured: true

- name: healthtracker.app
  price: 8500
  description: Ideal for health monitoring apps and fitness tracking platforms
  category: Health
  featured: false
```

### Параметры:

- **name**: Полное имя домена (включая расширение .com, .io, .net и т.д.)
- **price**: Цена в долларах (без знака $)
- **description**: Краткое описание (будет отображаться на карточке)
- **category**: Категория домена (Technology, Health, Finance, Education и т.д.)
- **featured**: true/false - будет ли домен помечен как "Featured"

## Способ 2: Создание отдельной страницы для домена (рекомендуется)

Этот способ создает полноценную страницу для каждого домена с подробным описанием, формами и всем функционалом.

### Шаги:

1. Создайте новый файл в папке `_domains/`
2. Назовите файл по имени домена (без расширения), например: `cryptoexchange.md`
3. Добавьте следующее содержимое:

```markdown
---
layout: domain
name: cryptoexchange.io
price: 25000
description: |
  CryptoExchange.io is a premium domain name perfect for cryptocurrency exchange platforms, 
  blockchain trading services, and digital asset marketplaces. This powerful domain conveys 
  trust, security, and innovation in the rapidly growing crypto industry.
  
  Whether you're launching a new crypto exchange, a DeFi platform, or a blockchain-based 
  trading service, CryptoExchange.io provides instant credibility and brand recognition. 
  The .io extension is highly sought after in the tech and crypto communities.
category: Cryptocurrency
featured: true
---
```

### Параметры:

- **layout**: Всегда используйте `domain`
- **name**: Полное имя домена
- **price**: Цена в долларах
- **description**: Подробное описание (можно несколько параграфов)
- **category**: Категория домена
- **featured**: true/false

### Где будет доступна страница:

Если вы создали файл `_domains/cryptoexchange.md`, страница будет доступна по адресу:
`/domain/cryptoexchange/`

## Рекомендуемый подход

Используйте **оба способа** для максимального эффекта:

1. Добавьте домен в `_data/domains.yml` - он появится на главной странице
2. Создайте файл в `_domains/` - у домена будет своя подробная страница

## Массовое добавление доменов

Если у вас много доменов, вы можете:

### Вариант 1: Использовать скрипт

Создайте CSV файл с вашими доменами:

```csv
name,price,description,category,featured
domain1.com,10000,Description 1,Technology,true
domain2.io,15000,Description 2,Finance,false
domain3.net,8000,Description 3,Health,true
```

Затем используйте этот Python скрипт для генерации файлов:

```python
import csv
import os

# Читаем CSV
with open('domains.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    domains = list(reader)

# Создаем файлы для каждого домена
for domain in domains:
    domain_slug = domain['name'].replace('.com', '').replace('.io', '').replace('.net', '')
    
    content = f"""---
layout: domain
name: {domain['name']}
price: {domain['price']}
description: {domain['description']}
category: {domain['category']}
featured: {domain['featured'].lower()}
---
"""
    
    filename = f"_domains/{domain_slug}.md"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Created {filename}")

print("Done!")
```

### Вариант 2: Использовать Excel

1. Создайте таблицу Excel с колонками: name, price, description, category, featured
2. Заполните данными
3. Сохраните как CSV
4. Используйте скрипт выше

## Категории доменов

Рекомендуемые категории:

- Technology
- Finance
- Health
- Education
- E-commerce
- Real Estate
- Cryptocurrency
- Entertainment
- Travel
- Food & Beverage
- Sports
- Gaming
- Marketing
- Consulting
- Legal
- Medical

Вы можете создавать свои категории по необходимости.

## После добавления доменов

1. Сохраните изменения
2. Закоммитьте в Git:
```bash
git add .
git commit -m "Add new domains"
git push
```

3. GitHub Pages автоматически пересоберет сайт (займет 1-2 минуты)

## Проверка локально

Перед публикацией проверьте сайт локально:

```bash
bundle exec jekyll serve
```

Откройте http://localhost:4000 в браузере.

## Советы по описаниям доменов

### Для карточек (короткое описание):
- 1-2 предложения
- Укажите основное применение
- Будьте конкретны

### Для страниц доменов (подробное описание):
- 2-3 параграфа
- Опишите преимущества домена
- Укажите целевую аудиторию
- Приведите примеры использования
- Подчеркните уникальность

### Пример хорошего описания:

```
TechStartup.io is a premium domain name perfect for technology startups, 
innovation hubs, and entrepreneurial ventures. This powerful domain immediately 
communicates your focus on cutting-edge technology and startup culture.

Whether you're launching an accelerator program, a tech incubator, or building 
the next unicorn startup, TechStartup.io provides instant credibility. The .io 
extension is highly valued in the tech community and signals innovation.

This memorable domain is short, brandable, and SEO-friendly, making it ideal 
for companies looking to establish a strong online presence in the competitive 
tech startup ecosystem.
```

## Удаление доменов

Чтобы удалить домен:

1. Удалите его из `_data/domains.yml` (если он там есть)
2. Удалите файл из `_domains/` (если он там есть)
3. Закоммитьте изменения

## Изменение цены

Просто измените значение `price` в соответствующем файле и закоммитьте изменения.

---

Если у вас возникли вопросы, обратитесь к README.md или создайте Issue на GitHub.
