export const CapitalizeFirstLetter = (word: string) => {
    const caps = word.split('_').map(x => {
 const uppercaseFirstLetter = x.charAt(0).toUpperCase() + x.slice(1);
    return uppercaseFirstLetter
    }).join(' ');

    return caps;
   
}

export const FilterCourses = (options: string[], filter: string[]) => {
    const result = options.filter((e) => {
      return filter.indexOf(e) < 0;
    });
    return result;
}