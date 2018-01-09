import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
// import { promise } from 'selenium-webdriver';
// import { Promise } from 'q';
// import { Promise } from 'q';

@Injectable()

export class HeroService {
  private heroesUrl = 'api/heroes'; 
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor (private http: Http) {}

  // 获取英雄数组
  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl).toPromise()
    .then(response => response.json().Data as Hero[])
    .catch(this.handleError);
  }
  // 延迟获取英雄数组
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getHeroes()), 2000);
    } );
  }
  // 通过id获取英雄
  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url).toPromise()
    .then(response => response.json().Data as Hero)
    .catch(this.handleError);
  }

  // 更新英雄
  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
    .put(url, JSON.stringify(hero), {headers: this.headers})
    .toPromise()
    .then(() => hero)
    .catch(this.handleError);
  }
  // 创建英雄
  createHero(name: string): Promise<Hero> {
    return this.http
    .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
    .toPromise()
    .then(res => res.json().Data as Hero)
    .catch(this.handleError);
  }
  // 删除英雄
  deleteHero(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }
  // 错误
  private handleError(error: any): Promise<any> {
    console.error('a error occurred', error);
    return Promise.reject(error.message || error);
  }
}
