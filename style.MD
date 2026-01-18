.c-hero {
position: relative;
background: linear-gradient(180deg,
var(--white) 0%,
var(--blue-50) 100%);
height: 100%;
border-bottom: 1px solid var(--rose-50);

@include media-up(md) {
height: rem(608px);
}

& .c-container {
@include flex-element(column, center, center, rem(24px));

    @include media-up(md) {
      @include flex-element(row, start, space-between);
    }

}

&\_\_headline {
width: 100%;
z-index: 1;
padding: rem(80px) 0;

    @include media-up(md) {
      flex: 0 0 auto;
      width: 50%;
    }

}

& .c-title {
margin-bottom: rem(8px);

    &__pretitle {
      margin-bottom: rem(4px);
      background-color: var(--blue-50);
      display: inline-flex;
      padding: rem(4px) rem(16px);
      border-radius: rem(32px);
      border: 1px solid var(--blue-100);
    }

    &__subtitle {
      margin-bottom: rem(32px);
      font-size: rem(20px);
    }

}

&\_\_features {
display: grid;
grid-template-columns: 1fr;
gap: rem(24px);
margin-bottom: rem(32px);

    @include media-up(md) {
      grid-template-columns: 1fr 1fr;
      column-gap: rem(32px);
      row-gap: rem(24px);
    }

}

&\_\_feature {
display: flex;
align-items: flex-start;
gap: rem(12px);
}

&\_\_icon-wrapper {
padding: rem(8px);
border-radius: rem(8px);
display: flex;
align-items: center;
justify-content: center;

    &--blue {
      background-color: var(--blue-100);
      color: var(--blue-700);
    }

    &--green {
      background-color: var(--green-100);
      color: var(--green-700);
    }

    &--yellow {
      background-color: var(--amber-100);
      color: var(--amber-700);
    }

    &--light-blue {
      background-color: var(--blue-50);
      color: var(--blue-500);
    }

}

&\_\_icon {
width: rem(20px);
height: rem(20px);
}

&\_\_feature-title {
font-size: rem(16px);
font-weight: 600;
color: var(--gray-800);
margin-bottom: rem(4px);
}

&\_\_feature-desc {
font-size: rem(14px);
color: var(--gray-600);
line-height: 1.4;
}

&\_\_cta {
display: flex;
gap: rem(16px);
}

&\_\_image {
width: 100%;
height: 100%;
z-index: 1;

    display: flex;
    justify-content: center;
    align-items: flex-end;

    @include media-up(md) {
      flex: 0 0 auto;
      width: 50%;
    }

    img {
      display: block;
      width: 100%;
      max-width: 338px;

      @include media-up(md) {
        max-width: none;
        height: 100%;
        object-fit: cover;
      }
    }

}

}
